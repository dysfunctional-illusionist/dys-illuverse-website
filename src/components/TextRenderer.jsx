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

    // flippy button time
    const handleFlip = (e) => {
      // e.page or e.data.page depending on the flipbook version
      const page = e.data?.page ?? e.page ?? 0;
      setCurrentPage(page);
    };
    const prevPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const nextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
    };


    // check for button / keypress
    useEffect(() => {
      function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
          if (currentPage > 0) prevPage();
        } else if (e.key === 'ArrowRight') {
          if (currentPage < pages.length - 1) nextPage();
        }
      }
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, pages.length]);


  // force this wrapper to have no padding
  // useEffect(() => {
  //   const wrapper = document.querySelector('.stf__wrapper.--portrait');
  //   if (!wrapper) return;

  //   const fixPadding = () => {
  //     wrapper.style.setProperty('padding-bottom', '0', 'important');
  //   };

  //   fixPadding(); // fix initially

  //   // Observe any inline style attribute changes
  //   const observer = new MutationObserver(mutations => {
  //     mutations.forEach(mutation => {
  //       if (mutation.attributeName === 'style') {
  //         fixPadding();
  //       }
  //     });
  //   });

  //   observer.observe(wrapper, { attributes: true, attributeFilter: ['style'] });

  //   return () => observer.disconnect();
  // }, [pages, currentPage]);


  return (
    <div className="overflow-scroll pr-0.2rem">
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
          // fontSize: '16px', // or match your CSS
          // lineHeight: '1.5',
          // padding: '1rem',
          boxSizing: 'border-box',
        }}
      />

      {/* Your visible flipbook */}
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        showCover={false}
        mobileScrollSupport={true}
        onFlip={handleFlip}
      >
        {pages.map((page, idx) => (
          <div
            key={idx}
            className="page"
            dangerouslySetInnerHTML={{ __html: page }}
            style={{
            width: pageSize.width,
            height: pageSize.height,
            //border: '1px solid red',
            boxSizing: 'border-box',
            //padding: '100',    // override padding here
            // margin: '1',     // override margin too just in case
          }}
          />
        ))}
      </HTMLFlipBook>

       <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            width: '100%',
            boxSizing: 'border-box',
            position: 'absolute',
            bottom: '-3rem', // position below the flipbook
            left: 0,
            padding: '0 1rem',
          }}
        >
          <button
            className = "arrowbtn"
            onClick={prevPage}
            disabled={currentPage === 0}
            style={{
              opacity: currentPage === 0 ? 0.5 : 1,
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
            }}
          >
            ◀ back
          </button>

          <button
            className = "arrowbtn"
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            style={{
              opacity: currentPage === pages.length - 1 ? 0.5 : 1,
              cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
            }}
          >
            next ▶
          </button>
        </div>
    </div>
  );
}
