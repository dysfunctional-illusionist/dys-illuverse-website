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
    const sampleP = document.querySelector("p");
    if (!sampleP) return;

    const computed = window.getComputedStyle(sampleP);

    if (containerRef.current) {
      const container = containerRef.current;
      container.style.fontSize = computed.fontSize;
      container.style.lineHeight = computed.lineHeight;
      container.style.fontFamily = computed.fontFamily;
      container.style.fontWeight = computed.fontWeight;
      container.style.letterSpacing = computed.letterSpacing;
      container.style.wordSpacing = computed.wordSpacing;
      container.style.whiteSpace = "normal"; // important for wrapping
    }

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

  // fill container til overflow, push
useEffect(() => {
  if (pageSize.width === 0 || pageSize.height === 0) return; // wait for valid size

  const container = containerRef.current;
  if (!container) return;

  // Prepare hidden tempDiv for measuring chunks, styled like container
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${pageSize.width}px`;
  tempDiv.style.fontSize = window.getComputedStyle(container).fontSize;
  tempDiv.style.lineHeight = window.getComputedStyle(container).lineHeight;
  tempDiv.style.padding = window.getComputedStyle(container).padding;
  tempDiv.style.whiteSpace = "normal";
  document.body.appendChild(tempDiv);

  // Clear container before starting
  container.innerHTML = "";

  // Parse paragraphs from HTML string
  const tempWrapper = document.createElement("div");
  tempWrapper.innerHTML = html;
  const paragraphs = Array.from(tempWrapper.querySelectorAll("p"));

  const splitPages = [];

  paragraphs.forEach((p) => {
    // Add paragraph clone to container
    container.appendChild(p.cloneNode(true));

    // Check if container now overflows: if yes,
    if (container.getBoundingClientRect().height > pageSize.height) {
      // console.log("overflow: container height ", 
      //   container.getBoundingClientRect().height,
      //   " is more than pagesize, ",
      //   pageSize.height
      // )
      
      // Remove last paragraph that caused overflow
      container.removeChild(container.lastChild);

      // Push accumulated container content as a page
      if (container.innerHTML.trim()) {
        //console.log("pushing full container: ", container.innerHTML.trim());
        splitPages.push(container.innerHTML);
      }

      // Clear container to handle large paragraph by splitting words
      container.innerHTML = "";

      const words = p.textContent.split(" ");
      let chunkWords = [];

      words.forEach((word) => {
        chunkWords.push(word);
        tempDiv.innerText = chunkWords.join(" ");

        if (tempDiv.getBoundingClientRect().height > pageSize.height) {
          // Remove last word that caused overflow
          chunkWords.pop();

          // Push chunk as page
          splitPages.push(`<p>${chunkWords.join(" ")}</p>`);

          // Start new chunk with current word
          chunkWords = [word];
        }
      });

      // Push leftover chunk if any
      if (chunkWords.length) {
        splitPages.push(`<p>${chunkWords.join(" ")}</p>`);
      }
    }
  });

  // Push any remaining paragraphs accumulated in container
  if (container.innerHTML.trim()) {
    splitPages.push(container.innerHTML);
  }

  // Cleanup tempDiv from DOM
  if (tempDiv.parentNode) {
    tempDiv.parentNode.removeChild(tempDiv);
  }

  // Set pages state
  setPages(splitPages);

  console.log("Pages length:", splitPages.length);
  console.log("First page HTML:", splitPages[0]);
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
          padding: "0",
          margin: "0",
          lineHeight: "0",
          boxSizing: "content-box",
          width: pageSize.width + "px",
          height: "auto",
          whiteSpace: "normal",  // make sure wrapping is enabled
          minHeight: "1px", }}></div>

      {/* dummy container to measure size during update */}
      <div 
        ref={measureRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          width: "80vw", // match your intended page width
          height: "auto",
          fontSize: "16px", // match CSS for pages
          lineHeight: "1.5",
          padding: "1rem"
        }}
      >
        this is hopefully hidden sample text to calculate page size.
      </div>

      {/* actual flipbook */}
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        //size="stretch"
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
            style={{ border: "1px solid red",
              width: pageSize.width, height: pageSize.height }}
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
