import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39756459-c2ffb5d5cd8be2a96a5bc05b0';

export const fetchImages = async (query, page, { signal }) => {
  const url = `${BASE_URL}?q=cat&page=${page}&key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url, {
    signal,
  });

  return response.data;
};
