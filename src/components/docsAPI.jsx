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

  console.log(res.data);

  let fixEncoding = fixMojibake(res.data);
  //console.log(fixEncoding);
  fixEncoding = he.decode(fixEncoding);

  // fix faulty styling / invalid HTML
  // Remove quotes inside style attribute values (especially inside font-family)
  fixEncoding = fixEncoding.replace(/style="([^"]*)"/g, (match, p1) => {
    // Remove unescaped quotes inside style value (dangerous, but might help)
    const cleaned = p1.replace(/"/g, '');
    return `style="${cleaned}"`;
  });

  // turn font-style italic into <i> tags
  //const converti = HTMLEntityDecode.replace(/<span style="font-style:italic;">(.*?)<\/span>/g, '<i>$1</i>');
  const converti = fixEncoding.replace(
    /<span([^>]*)style="([^"]*font-style:\s*italic[^"]*)"([^>]*)>(.*?)<\/span>/gi,
    (_, beforeStyle, styleContent, afterStyle, innerContent) => {
      // drop all span attributes since we're converting to <i>
      return `<i>${innerContent}</i>`;
    }
  );
  
  //console.log(converti);
  const cleanContent = cleanDocHTML(converti);
  //console.log(cleanContent);
  //console.log('API is sending htmlContent type:', typeof cleanContent);
  return cleanContent;
  //return content;

}

import sanitizeHtml from "sanitize-html";
import { JSDOM } from "jsdom";

export function cleanDocHTML(rawHtml) {
  //console.log(rawHtml, "PRECLEAN");
  rawHtml = preCleanStyles(rawHtml);
  //console.log(rawHtml);
  const dom = new JSDOM(rawHtml);
  const document = dom.window.document;

  [...document.querySelectorAll('[style]')].forEach(el => {
    let style = el.getAttribute('style');
    if (!style) return;

    // Normalize style string: lowercase, trim, replace multiple whitespace with one space
    style = style.toLowerCase().trim().replace(/\s+/g, ' ');

    if (style.includes('font-family: arial')) {
      console.log('Removing element:', el.outerHTML);
      el.remove();
    }
  });


  // Remove all sup tags (footnotes)
  document.querySelectorAll('sup').forEach(sup => sup.remove());

  // Remove all comment anchors <a id^="cmnt">
  document.querySelectorAll('a[id^="cmnt"]').forEach(el => el.remove());

  // Remove *any* element with inline style containing 'arial' (case-insensitive)
  [...document.querySelectorAll('[style]')].forEach(el => {
    const style = el.getAttribute('style');
    if (!style) return;

    // Normalize whitespace and line breaks to single spaces
    const styleNormalized = style.toLowerCase().replace(/\s+/g, ' ');
    
    const match = styleNormalized.match(/font-family\s*:\s*([^;]+)/i);
    if (match) {
      const fontFamilies = match[1].replace(/['"]/g, '').trim();
      if (fontFamilies.includes('arial')) {
        console.log('Removing element with arial font:', el.outerHTML);
        el.remove();
      }
    }
  });

  // Then get cleaned body HTML
  const bodyHTML = document.body.innerHTML;
  //console.log(bodyHTML);

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

function preCleanStyles(rawHtml) {
  const dom = new JSDOM(rawHtml);
  const document = dom.window.document;
  const arialSpanRegex = /<span\b[^>]*style\s*=\s*"(?:[^"]*font-family\s*:\s*[^";]*arial[^";]*[^"]*)"[^>]*>.*?<\/span>/gis;
  const cleanedHtml = rawHtml.replace(arialSpanRegex, '');
  const matches = rawHtml.match(arialSpanRegex);
  //console.log('Removing', matches?.length ?? 0, 'Arial spans');

  // Also remove <sup> tags, since they tend to be footnotes/comments
  document.querySelectorAll('sup').forEach(sup => sup.remove());

  //console.log(document.body.innerHTML);

  return document.body.innerHTML;
}

