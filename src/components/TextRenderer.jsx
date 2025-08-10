import ReactMarkdown from 'react-markdown';
  //return <ReactMarkdown>{markdown}</ReactMarkdown>;
import { parse } from 'node-html-parser';
import { useState, useRef, useEffect } from "react";
import ReactPageFlip from "react-pageflip";

export default function TextRenderer({ html, paras = 8 }) {
  const pageFlipRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [ready, setReady] = useState(false);

  // Split HTML into pages
  useEffect(() => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const paragraphs = Array.from(temp.querySelectorAll("p"));
    const chunked = [];
    for (let i = 0; i < paragraphs.length; i += paras) {
      chunked.push(
        paragraphs
          .slice(i, i + paras)
          .map((p) => p.outerHTML)
          .join("")
      );
    }
    setPages(chunked);
  }, [html, paras]);

  // Mark ready after mount (Astro sometimes skips onInit timing)
  useEffect(() => {
    setReady(true);
  }, []);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!ready || !pageFlipRef.current) return;
      const flip = pageFlipRef.current.pageFlip();
      if (e.key === "ArrowRight") flip.flipNext();
      if (e.key === "ArrowLeft") flip.flipPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ready]);

  const nextPage = () => {
    if (ready && pageFlipRef.current) {
      pageFlipRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (ready && pageFlipRef.current) {
      pageFlipRef.current.pageFlip().flipPrev();
    }
  };


  return (
    <div>
      <div className="flex gap-6">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={!ready}
        >
          ← Prev
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={!ready}
        >
          Next →
        </button>
      </div>
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
