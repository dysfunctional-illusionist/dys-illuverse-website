import { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from "react-pageflip";

export default function TextRenderer({
  html,
  defaultPageWidth = 550,
  defaultPageHeight = 700,
}) {
  const containerRef = useRef(null);
  const measuringRef = useRef(null);
  const flipBookRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [pageSize, setPageSize] = useState({
    width: defaultPageWidth || 550,
    height: defaultPageHeight || 700,
  });

  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    if (pageSize.width === 0 || pageSize.height === 0) return;
    if (!measuringRef.current || !containerRef.current) return;

    const measuringDiv = measuringRef.current;
    const container = containerRef.current;

    // Clear container
    container.innerHTML = "";

    // Create a temp div inside measuringDiv to do measurements
    // This div should mimic styles of your page content exactly (font size, line height, width)
    measuringDiv.style.width = `${pageSize.width}px`;
    measuringDiv.style.fontSize = window.getComputedStyle(container).fontSize;
    measuringDiv.style.lineHeight = window.getComputedStyle(container).lineHeight;
    measuringDiv.style.padding = window.getComputedStyle(container).padding;

    // Parse paragraphs from your html string
    const tempWrapper = document.createElement("div");
    tempWrapper.innerHTML = html;
    const paragraphs = Array.from(tempWrapper.querySelectorAll("p"));

    const splitPages = [];
    let currentContent = "";

    paragraphs.forEach((p) => {
      container.innerHTML = currentContent + p.outerHTML;

      // If adding this paragraph makes container too tall, push currentContent as page
      if (container.getBoundingClientRect().height > pageSize.height) {
        splitPages.push(currentContent);
        currentContent = p.outerHTML;
      } else {
        currentContent += p.outerHTML;
      }
    });

    // Push last content
    if (currentContent.trim()) {
      splitPages.push(currentContent);
    }

    setPages(splitPages);
  }, [html, pageSize]);

  return (
    <div>
      {/* Hidden measuring div */}
      <div
        ref={measuringRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          visibility: 'hidden',
          overflow: 'visible',
          whiteSpace: 'normal',
        }}
      />

      {/* Hidden container div used for measuring (optional, can be the same as measuringRef) */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          visibility: 'hidden',
          width: `${pageSize.width}px`,
          fontSize: '16px', // or match your CSS
          lineHeight: '1.5',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      />

      {/* Your visible flipbook */}
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        showCover={false}
        mobileScrollSupport={true}
      >
        {pages.map((page, idx) => (
          <div
            key={idx}
            className="p-4"
            dangerouslySetInnerHTML={{ __html: page }}
            style={{
              width: pageSize.width,
              height: pageSize.height,
              border: '1px solid red',
              boxSizing: 'border-box',
            }}
          />
        ))}
      </HTMLFlipBook>
    </div>
  );
}
