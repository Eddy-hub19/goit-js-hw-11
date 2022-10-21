import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '9534498-01df2148594d3f0d4c2aed4f3';

export async function fetchPics(name, page, perPage) {
  const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`${BASE_URL}/api/?${params}`);
    return response;
  } catch (error) {
    console.log(err.response.data);
  }
}
