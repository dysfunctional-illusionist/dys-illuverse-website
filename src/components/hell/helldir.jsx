
// const buttons = JSON.parse(nav.dataset.buttons);

export default function HellDir_Buttons({ pages }) {
  return (
    <>
     <div className="grid grid-cols-3 gap-6 justify-items-center">
        {pages.map((page) =>
          page.exists ? (

            <button
              onClick={() => window.location.href = page.url }
              className="
                font-doHyeon text-4xl text-red-700 px-10 py-6
                rounded-lg shadow-lg

                border-2 border-red-700
                bg-black
                text-red-700

                hover:border-orange-500
                hover:bg-red-900
                hover:text-white
                
                hover:from-black hover:via-red-900 hover:to-orange-600
                hover:text-white
                transition-colors duration-500">
              {/* <img src="/icons/star.svg" alt="Star icon" className="w-5 h-5" /> */}
              {page.title}
            </button>

            // <a href={page.url}>{page.title}</a>

          ) : (
            <a className="disabled" aria-disabled="true">

            <button
              onClick={() => window.location.href = page.url }
              className="
                bg-gradient-to-b from-black via-black/40 to-black/20
                font-doHyeon text-4xl text-red-700 px-10 py-6
                rounded-lg shadow-lg
                hover:from-black hover:via-red-900 hover:to-orange-600
                hover:text-white
                transition-colors duration-500">
              {/* <img src="/icons/star.svg" alt="Star icon" className="w-5 h-5" /> */}
              {page.title}
            </button>

            </a>
          )
        )}
      </div>
    </>
  );
}