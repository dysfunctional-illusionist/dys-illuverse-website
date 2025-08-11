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

    let resizeTimeout;

    function measurePage() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Ignore obviously bogus sizes
      if (rect.width < 100 || rect.height < 100) {
        console.log("Skipping bogus measurement:", rect.width, rect.height);
        return;
      }

      setPageSize((prev) => {
        if (
          prev.width === Math.floor(rect.width) &&
          prev.height === Math.floor(rect.height)
        ) {
          return prev; // no change
        }
        console.log("Updating page size to:", rect.width, rect.height);
        return {
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        };
      });
    }


    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        measurePage();
      }, 150); // debounce delay in ms
    }

    measurePage();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  // fill container til overflow, then push
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

  // Parse paragraphs from HTML string
  const tempWrapper = document.createElement("div");
  tempWrapper.innerHTML = html;
  const paragraphs = Array.from(tempWrapper.querySelectorAll("p"));

  const splitPages = [];
  container.innerHTML = "";

  let i = 0;
  while (i < paragraphs.length) {
    const p = paragraphs[i].cloneNode(true);
    container.appendChild(p);

    if (container.getBoundingClientRect().height > pageSize.height) {
      // Paragraph caused overflow
      container.removeChild(p);

      if (container.innerHTML.trim()) {
        // Save full page
        splitPages.push(container.innerHTML);
        container.innerHTML = "";
      }

      // If paragraph alone is too big → split by words
      tempDiv.innerHTML = "";
      tempDiv.appendChild(p.cloneNode(true));
      if (tempDiv.getBoundingClientRect().height > pageSize.height) {
        const words = p.textContent.split(" ");
        let chunkWords = [];
        tempDiv.innerHTML = "";

        for (let w = 0; w < words.length; w++) {
          chunkWords.push(words[w]);
          tempDiv.innerText = chunkWords.join(" ");

          if (tempDiv.getBoundingClientRect().height > pageSize.height) {
            chunkWords.pop();
            splitPages.push(`<p>${chunkWords.join(" ")}</p>`);
            chunkWords = [words[w]];
          }
        }

        if (chunkWords.length) {
          splitPages.push(`<p>${chunkWords.join(" ")}</p>`);
        }

        i++; // move to next paragraph after splitting
      }
      // Else: retry this paragraph on the next page
    } else {
      // Paragraph fit fine
      i++;
    }
  }

  // Push any leftover content
  if (container.innerHTML.trim()) {
    splitPages.push(container.innerHTML);
  }

  // Cleanup tempDiv
  tempDiv.remove();

  setPages(splitPages);
  console.log("Pages length:", splitPages.length);
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
        ref={containerRef}
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
