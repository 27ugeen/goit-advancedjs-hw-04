import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getCurrentPage, getLimit, getTotalHits } from './pixabay-api';

export function renderGallery(imageArray) {
  const galleryContainer = document.querySelector('.gallery');

  if (!galleryContainer) {
    console.error('Gallery container not found');
    return;
  }

  const newItemsHTML = imageArray.map(generateGalleryItemHTML).join('');
  galleryContainer.insertAdjacentHTML('beforeend', newItemsHTML);
  initializeLightbox();
}

function generateGalleryItemHTML(image) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          data-source="${largeImageURL}"
          alt="${tags}"
        />
        <div class="image-details">
          ${generateDetailElementHTML('Likes', likes)}
          ${generateDetailElementHTML('Views', views)}
          ${generateDetailElementHTML('Comments', comments)}
          ${generateDetailElementHTML('Downloads', downloads)}
        </div>
      </a>
    </li>`;
}

function generateDetailElementHTML(title, value) {
  return `
    <div class="details-element">
      <p class="details-title">${title}</p>
      <p class="details-value">${value}</p>
    </div>`;
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.on('show.simplelightbox', function (e) {
    e.preventDefault();
  });

  lightbox.on('error.simplelightbox', function (e) {
    console.log(e); // some usefull information
  });

  lightbox.refresh();
}

export function toggleLoader(isLoading) {
  document.querySelector('.loader-wrapper').style.display = isLoading
    ? 'flex'
    : 'none';
}

export function toggleLoadMoreButton(visible) {
  document.querySelector('.load-more-button').style.display = visible
    ? 'block'
    : 'none';
}

// Check the end of the collection to display an alert
export function checkEndOfResults() {
  const limit = getLimit();
  const totalHits = getTotalHits();
  const totalPages = Math.ceil(totalHits / limit);
  const currentPage = getCurrentPage();

  if (currentPage >= totalPages) {
    toggleLoadMoreButton(false);
    showErrorAlert(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    toggleLoadMoreButton(true);
  }
}

export function showErrorAlert(message) {
  return iziToast.error({
    id: 'error',
    position: 'topRight',
    message: message,
    transitionIn: 'fadeInDown',
  });
}

// Function to scroll the page smoothly by the height of gallery items
export function scrollPageToNextGroup() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  const firstItem = galleryItems[0];
  const itemHeight = firstItem.getBoundingClientRect().height;

  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
}
