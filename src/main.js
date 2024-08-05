import {
  fetchImages,
  resetPage,
  incrementPage,
  getCurrentPage,
} from './js/pixabay-api';
import {
  renderGallery,
  toggleLoader,
  scrollPageToNextGroup,
  toggleLoadMoreButton,
  checkEndOfResults,
  showErrorAlert,
} from './js/render-functions';

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

let currentSearchQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentSearchQuery = searchInput.value.trim();
  gallery.innerHTML = '';
  toggleLoadMoreButton(false);

  if (currentSearchQuery === '') {
    showErrorAlert('The search field cannot be empty');
    toggleLoader(false);
  } else {
    toggleLoader(true);
    resetPage();
    try {
      const hits = await fetchImages(currentSearchQuery, getCurrentPage());
      if (hits.length === 0) {
        showErrorAlert(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        renderGallery(hits);
        checkEndOfResults();
        incrementPage();
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorAlert(
        'An error occurred while fetching images. Please try again later.'
      );
    } finally {
      toggleLoader(false);
      searchInput.value = '';
    }
  }
});

loadMoreButton.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
  toggleLoader(true);
  try {
    const hits = await fetchImages(currentSearchQuery, getCurrentPage());
    if (hits.length > 0) {
      renderGallery(hits);
      scrollPageToNextGroup();
      checkEndOfResults();
      incrementPage();
    } else {
      toggleLoadMoreButton(false);
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorAlert(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    toggleLoader(false);
  }
}
