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
  const withoutSup = cutAfterFirstSup(converti);

  const cleanContent = cleanDocHTML(withoutSup);
  console.log("************** cleancontent: **************", cleanContent);

  //console.log('API is sending htmlContent type:', typeof cleanContent);
  return cleanContent;
  //return content;

}

import sanitizeHtml from "sanitize-html";
import { JSDOM } from "jsdom";

export function cleanDocHTML(rawHtml) {
  // Step 1: extract just body content
  const dom = new JSDOM(rawHtml);
  let bodyHtml = dom.window.document.body.innerHTML;

  const allowedTags = sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'a').concat([ "img", "h1", "h2", "h3", "span", "i", "b" ]);
  // no a

  // Step 2: sanitize and customize styles
  const cleanHtml = sanitizeHtml(bodyHtml, {
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

function cutAfterFirstSup(htmlString) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // Find the first <sup> element
  const firstSup = document.querySelector('sup');

  if (firstSup) {
    // Remove firstSup and all siblings after it
    let node = firstSup;
    while (node) {
      const next = node.nextSibling;
      node.remove();
      node = next;
    }
  }

  return document.body.innerHTML;
}

