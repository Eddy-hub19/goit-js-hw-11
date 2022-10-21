export const renderGalleryTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return /*html*/ `
      <div class="photo-card">
        <a href='${largeImageURL}'>
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350px" height="250px" />
        </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b></br>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b></br>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b></br>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b></br>
      ${downloads}
    </p>
  </div>
</div>`;
};
