import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export default function TextRenderer({
  html,
  defaultPageWidth = 550,
  defaultPageHeight = 700,
}) {
  const containerRef = useRef(null);
  const flipBookRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [pageSize, setPageSize] = useState({
    width: defaultPageWidth || 550,
    height: defaultPageHeight || 700,
  });
  const [currentPage, setCurrentPage] = useState(0);

  // 1. Size adjustment effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      if (rect.width && rect.height) {
        const maxWidth = Math.min(rect.width, defaultPageWidth);
        const maxHeight = Math.min(rect.height, defaultPageHeight);
        setPageSize({
          width: Math.floor(maxWidth),
          height: Math.floor(maxHeight),
        });
      }
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();

    // const updateSize = () => {
    //   if (!containerRef.current) return;
    //   const rect = containerRef.current.getBoundingClientRect();

    //   const maxWidth = Math.min(rect.width, defaultPageWidth);
    //   const maxHeight = Math.min(rect.height, defaultPageHeight);

    //   setPageSize({
    //     width: Math.floor(maxWidth),
    //     height: Math.floor(maxHeight),
    //   });
    // };

    // updateSize();
    // window.addEventListener("resize", updateSize);
    // return () => window.removeEventListener("resize", updateSize);
  }, [defaultPageWidth, defaultPageHeight]);

  // 2. Page splitting effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const paragraphs = Array.from(temp.querySelectorAll("p"));

    container.style.width = pageSize.width + "px";
    container.style.fontSize = "16px";
    container.style.lineHeight = "1.5";

    const splitPages = [];

    paragraphs.forEach((p) => {
      container.appendChild(p.cloneNode(true));

      if (container.getBoundingClientRect().height > pageSize.height) {
        container.removeChild(container.lastChild);

        if (container.innerHTML.trim()) {
          splitPages.push(container.innerHTML);
        }

        const longPara = p.cloneNode(true);
        const words = longPara.innerHTML.split(" ");
        container.innerHTML = "";

        let chunk = "";
        words.forEach((word) => {
          const testChunk = chunk ? `${chunk} ${word}` : word;
          container.innerHTML = `<p>${testChunk}</p>`;

          if (container.getBoundingClientRect().height > pageSize.height) {
            splitPages.push(`<p>${chunk}</p>`);
            chunk = word;
            container.innerHTML = `<p>${chunk}</p>`;
          } else {
            chunk = testChunk;
          }
        });

        if (chunk.trim()) {
          splitPages.push(`<p>${chunk}</p>`);
          container.innerHTML = "";
        }
      }
    });

    // Push leftover content
    if (container.innerHTML.trim()) {
      splitPages.push(container.innerHTML);
    }

    setPages(splitPages);
  }, [html, pageSize]);

  // Navigation functions
  const nextPage = () => flipBookRef.current?.pageFlip().flipNext();
  const prevPage = () => flipBookRef.current?.pageFlip().flipPrev();

  // 3. Keydown effect
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
        nextPage();
      } else if (e.key === "ArrowLeft" && currentPage > 0) {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentPage, pages.length]);

  // Flip handler
  const handleFlip = (e) => setCurrentPage(e.data);

  const totalPages = pages.length;

  // delay until valid size
  if (pageSize.width < 100 || pageSize.height < 100) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-col items-center">
      {/* Hidden measuring container */}
      <div
        className="invisiblepage"
        ref={containerRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: pageSize.width + "px",
        }}
      ></div>

      {/* Flipbook */}
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        maxHeight={1536}
        showCover={false}
        mobileScrollSupport={true}
        ref={flipBookRef}
        onFlip={handleFlip}
      >
        {pages.map((page, idx) => (
          <div
            key={idx}
            className="p-4"
            dangerouslySetInnerHTML={{ __html: page }}
          />
        ))}
      </HTMLFlipBook>

      {/* Navigation */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          ◀ Prev
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
