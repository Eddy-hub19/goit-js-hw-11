import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPics } from './js/fetchAPI';
import { renderGalleryTemplate } from './js/markup';
import { refs } from './js/refs';

let inputValue = '';
let page = 1;
const perPage = 40;
let lightbox = null;

lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  inputValue = e.currentTarget.elements.searchQuery.value.trim();

  const response = await loadPics(inputValue, page);
  const totalHits = response.data.totalHits;

  totalHitsFound(totalHits);
}

async function loadPics(inputValue, page) {
  if (inputValue === '') {
    return Notiflix.Notify.warning('Enter, please, any value in the field.');
  }

  try {
    const pic = await fetchPics(inputValue, page, perPage);
    const stats = pic.data.hits;
    const hitsLength = pic.data.hits.length;

    if (hitsLength < perPage && hitsLength > 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.loadMoreBtn.style.display = 'block';
    }

    if (stats.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderGalleryMarkup(stats);
    }

    return pic;
  } catch (error) {
    console.log(error);
  } finally {
    refs.searchForm.reset();
  }
}

function renderGalleryMarkup(images) {
  const templates = images.map(img => renderGalleryTemplate(img)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', templates);
  lightbox.refresh();
}

async function onLoadMoreBtnClick() {
  page += 1;
  await loadPics(inputValue, page);
  smoothScroll();
}

function totalHitsFound(totalHits) {
  if (totalHits !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
