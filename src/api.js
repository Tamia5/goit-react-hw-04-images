import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '39300767-f0d69d4d22ce0cdc344bb6eaf';
export const fetchData = async (query, page) => {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
