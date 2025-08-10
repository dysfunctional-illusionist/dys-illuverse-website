import { google } from "googleapis";
import mammoth from "mammoth";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export default async function fetchGoogleDocDual(docID) {
  const docxBuffer = await fetchGoogleDoc(docID);
  const html = await convertDocxToHtml(docxBuffer);
  const markdown = await htmlToMarkdown(html);

  return { html, markdown };
}

// docx from Drive using service account
export async function fetchGoogleDoc(docID) {
  const keyData = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  keyData.private_key = keyData.private_key.replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: keyData,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.export(
    {
      fileId: docID,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { responseType: "arraybuffer" }
  );

  return Buffer.from(res.data);
}

// Convert DOCX → clean HTML (via Mammoth)
async function convertDocxToHtml(docxBuffer) {
  const result = await mammoth.convertToHtml({ buffer: docxBuffer }, {
    styleMap: [
      "i => em",    // italics → <em>
      "b => strong" // bold → <strong>
    ],
    ignoreEmptyParagraphs: true
  });

  return result.value; // HTML string
}

// HTML → Markdown
async function htmlToMarkdown(html) {
  const markdown = String(
    await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeRemark)
      .use(remarkStringify)
      .process(html)
  );

  return markdown;
}

// // Example usage
// if (import.meta.url === `file://${process.argv[1]}`) {
//   const docID = process.argv[2];
//   if (!docID) {
//     console.error("Usage: node fetchDocDualOutput.js <Google Doc ID>");
//     process.exit(1);
//   }

//   const { html, markdown } = await fetchGoogleDocDual(docID);
//   console.log("HTML OUTPUT:\n", html);
//   console.log("\n---\n");
//   console.log("MARKDOWN OUTPUT:\n", markdown);
// }


// ASTRO:
// ---
// import { fetchGoogleDocDual } from '../lib/fetchDocDualOutput.js';
// const { html } = await fetchGoogleDocDual('YOUR_DOC_ID');
// ---
// <div class="prose" set:html={html} />

// or 
// ---
// import { fetchGoogleDocDual } from '../lib/fetchDocDualOutput.js';
// const { markdown } = await fetchGoogleDocDual('YOUR_DOC_ID');
// import Markdown from '@astrojs/markdown-remark';
// ---
// <Markdown content={markdown} />