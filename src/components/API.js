import axios from 'axios';

const API_KEY = '40791678-21bd493143af10c7aa2f36279';
const BASE_URL = 'https://pixabay.com/api';

export const fetchGalleryItems = async (searchText, pages, per_page) => {
  return await axios.get(
    `${BASE_URL}/?q=${searchText}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${pages}`
  );
};
