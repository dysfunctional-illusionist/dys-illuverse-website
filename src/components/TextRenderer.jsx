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

  // Measure container size
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setPageSize({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []); // runs once

  // Split text based on container size
  useEffect(() => {

    // if pagesize is 0, go back
    if (pageSize.width === 0 || pageSize.height === 0) return; // wait for valid size
    
    const container = containerRef.current;
    console.log("container size at start:", container.getBoundingClientRect());
    if (!container) return;
    container.innerHTML = "";

    // banana split time

    const splitPages = [];
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.width = container.style.width;
    tempDiv.style.fontSize = container.style.fontSize;
    tempDiv.style.lineHeight = container.style.lineHeight;
    document.body.appendChild(tempDiv);

    tempDiv.innerHTML = html;
    const paragraphs = Array.from(tempDiv.querySelectorAll("p"));

    // container.innerHTML = "";  // clear before splitting

    paragraphs.forEach((p, pIndex) => {
      //console.log(`Paragraph ${pIndex} starting, content:`, p.textContent);

      // add to container
      container.appendChild(p.cloneNode(true));

      console.log("container bounding client rect height is :", container.getBoundingClientRect().height);
      console.log("page height is :", pageSize.height);

      // if our container is now too big, remove that last child and push our container's contents into pages
      if (container.getBoundingClientRect().height > pageSize.height * 0.98) {
        container.removeChild(container.lastChild);
        if (container.innerHTML.trim()) {
          splitPages.push(container.innerHTML);
        }

        // split para by words
        const words = p.textContent.split(" ");
        let chunkWords = [];
        chunkWords = [];
        words.forEach((word) => {
          chunkWords.push(word);
          tempDiv.innerText = chunkWords.join(" ");
          tempDiv.style.font = container.style.font;
          tempDiv.style.width = container.style.width;
          if (tempDiv.getBoundingClientRect().height > pageSize.height) {
            chunkWords.pop();
            splitPages.push(`<p>${chunkWords.join(" ")}</p>`);
            chunkWords = [word];
          }
        });

        if (chunkWords.length) {
          splitPages.push(`<p>${chunkWords.join(" ")}</p>`);
        }
        container.innerHTML = "";
      }

      if (tempDiv.parentNode) {
        tempDiv.parentNode.removeChild(tempDiv);
      }

      if (container.innerHTML.trim()) {
        splitPages.push(container.innerHTML);
      }

      let chunk = "";
      container.innerHTML = ""; // reset container

      // words.forEach((word) => {
      // const testChunk = chunk ? `${chunk} ${word}` : word;
      // container.innerHTML = `<p>${testChunk}</p>`;});

      // push leftover chunk if any
      if (chunk.trim()) {
        splitPages.push(`<p>${chunk}</p>`);
        console.log("pushing chunk: ", chunk);
      }

    container.innerHTML = ""; // Clear container for next paragraphs
    });

    // Push any remaining content that fit fully (if any)
    if (container.innerHTML.trim()) {
      splitPages.push(container.innerHTML);
    }

      console.log("Splitting pages done", splitPages.length);
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
