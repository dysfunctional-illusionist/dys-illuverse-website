import ReactMarkdown from 'react-markdown';
  //return <ReactMarkdown>{markdown}</ReactMarkdown>;
import { parse } from 'node-html-parser';
import React, { useRef } from "react";
import ReactPageFlip from "react-pageflip";

export default function TextRenderer({ html, paras = 8 }) {
  const pageFlipRef = useRef(null);

  // Just split html by paragraphs for example
  const paragraphs = html.split("</p>");
  const pages = [];
  for (let i = 0; i < paragraphs.length; i += paras) {
    pages.push(paragraphs.slice(i, i + paras).join("</p>") + "</p>");
  }

  const nextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  };

  const prevPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  };

  return (
    <div>
      <button onClick={prevPage}>⬅️ Prev</button>
      <button onClick={nextPage}>Next ➡️</button>

      <ReactPageFlip
        ref={pageFlipRef}
        width={400}
        height={600}
        className="demoPageFlip"
      >
        {pages.map((content, index) => (
          <div key={index} className="page">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ))}
      </ReactPageFlip>
    </div>
  );
}
