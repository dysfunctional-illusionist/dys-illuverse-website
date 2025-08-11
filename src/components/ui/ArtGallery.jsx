function ArtGallery({ artworks }) {
  return (
    <div className="art-gallery">
      {artworks.map(({ id, title, thumbnailUrl, fullUrl }) => (
        <div key={id} className="art-item" tabIndex={0} role="button" onClick={() => openModal(fullUrl)}>
          <img src={thumbnailUrl} alt={title} />
          <figcaption>{title}</figcaption>
        </div>
      ))}
    </div>
  );
}
