import axios from 'axios';

const apiKey = '14594113-3565582ddf884392468dadf7f';
const apiUrl = 'https://pixabay.com/api/';
const limit = 15;

let currentPage = 1;
let totalHits = 0;

export async function fetchImages(searchQuery, page = 1) {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: limit,
    page,
  });

  const url = `${apiUrl}?${searchParams}`;

  try {
    const response = await axios.get(url);
    totalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    totalHits = 0;
    console.error('Error fetching images:', error);
    return [];
  }
}

export function resetPage() {
  currentPage = 1;
}

export function incrementPage() {
  currentPage += 1;
}

export function getCurrentPage() {
  return currentPage;
}

export function getLimit() {
  return limit;
}

export function getTotalHits() {
  return totalHits;
}
