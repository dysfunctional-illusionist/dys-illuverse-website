import { google } from "googleapis";
//const { google } = require("googleapis");
import 'dotenv/config';
import he from 'he';

export async function fetchGoogleDoc(docID) {
  const keyData = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  keyData.private_key = keyData.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: keyData,
    scopes: [
      //"https://www.googleapis.com/auth/documents.readonly",
      "https://www.googleapis.com/auth/drive"
    ],
  });

  // Get as plaintext
  // const docs = google.docs({ version: "v1", auth });
  // const res = await docs.documents.get({ documentId: docId });

  // const content = res.data.body.content
  //   .map(block => {
  //     if (block.paragraph) {
  //       return block.paragraph.elements
  //         .map(e => e.textRun?.content || "")
  //         .join("");
  //     }
  //     return "";
  //   })
  //   .join("\n");

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.export(
    {
      fileId: docID,
      mimeType: "text/html",
    },
    { responseType: "text" }
  );

  //console.log(res.data);

  const fixEncoding = fixMojibake(res.data);
  //console.log(fixEncoding);
  const HTMLEntityDecode = he.decode(fixEncoding);

  // turn font-style italic into <i> tags
  //const converti = HTMLEntityDecode.replace(/<span style="font-style:italic;">(.*?)<\/span>/g, '<i>$1</i>');
  const converti = HTMLEntityDecode.replace(
    /<span([^>]*)style="([^"]*font-style:\s*italic[^"]*)"([^>]*)>(.*?)<\/span>/gi,
    (_, beforeStyle, styleContent, afterStyle, innerContent) => {
      // drop all span attributes since we're converting to <i>
      return `<i>${innerContent}</i>`;
    }
  );

  // remove superscripts completely (these are comments)
  // Remove all <sup>...</sup> and everything inside
  //const withoutSup = converti.replace(/<sup[\s\S]*?<\/sup>/gi, '');
  
  //console.log(converti);
  const cleanContent = cleanDocHTML(converti);
  //console.log("************** cleancontent: **************", cleanContent);

  //console.log('API is sending htmlContent type:', typeof cleanContent);
  return cleanContent;
  //return content;

}

import sanitizeHtml from "sanitize-html";
import { JSDOM } from "jsdom";

export function cleanDocHTML(rawHtml) {
  // Step 1: extract just body content
  const dom = new JSDOM(rawHtml);
  const document = dom.window.document;

  // const footnotes = document.querySelectorAll('[class*="footnote"], [id*="footnote"]');
  // footnotes.forEach(fn => fn.remove());
  // const comments = document.querySelectorAll('[class*="comment"], [id*="comment"]');
  // comments.forEach(c => c.remove());

  console.log(document.body.innerHTML);

  const commentEls = document.querySelectorAll('[id^="cmnt"], [class^="cmnt"], [id*="cmnt"], [class*="cmnt"]');
  console.log('Comments found:', commentEls.length);
  commentEls.forEach(el => el.remove());

  const supEls = document.querySelectorAll('sup');
  console.log('Sup elements found:', supEls.length);
  supEls.forEach(sup => sup.remove());

  // check
  const cCheck = document.querySelectorAll('[id^="cmnt"], [class^="cmnt"], [id*="cmnt"], [class*="cmnt"]');
  const sCheck = document.querySelectorAll('sup');
  console.log('post cleaning, comments/sup found:', cCheck.length, " + ", sCheck.length);

  // Then get cleaned body HTML
  const bodyHTML = document.body.innerHTML;

  const allowedTags = sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'a').concat([ "img", "h1", "h2", "h3", "span", "i", "b" ]);
  // no a

  // Step 3: sanitize and customize styles
  const cleanHtml = sanitizeHtml(bodyHTML, {
    allowedTags,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["style", "class", "src", "alt"], // allow some styling and images
    },
    allowedStyles: {
    '*': {
      //'font-style': [/^italic$/],  // only allow 'italic' exactly
      '*': [/^.*$/], // allow all
    },
  },
    transformTags: {
      // Remove any inline color styles and add your own white-text class
      "*": (tagName, attribs) => {
        if (attribs.style && attribs.style.includes("color")) {
          // Remove color styles
          delete attribs.style;
          attribs.class = attribs.class ? attribs.class + " prose" : "prose";
        }
        return { tagName, attribs };
      },
    },
  });

  return cleanHtml;
}

function fixMojibake(str) {
  // Encode the string as Latin1 bytes, then decode as UTF-8
  return Buffer.from(str, 'latin1').toString('utf8');
}