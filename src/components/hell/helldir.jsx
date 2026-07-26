
// const buttons = JSON.parse(nav.dataset.buttons);

export default function HellDir_Buttons({ pages }) {
  return (
    <>
      {pages.map((page) =>
        page.exists ? (
          <a href={page.url}>{page.title}</a>
        ) : (
          <a className="disabled" aria-disabled="true">
            {page.title}
          </a>
        )
      )}
    </>
  );
}