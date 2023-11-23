import axios from 'axios';

export async function fetchImages({ q, page }) {
  const BASE_URL = 'https://pixabay.com/api/';

  const URL_PARAMS = new URLSearchParams({
    key: '40067748-747d8141c6ab6be87462ec83d',
    q,
    image_type: 'photo',
    orientation: 'hprizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  const { data } = await axios(`${BASE_URL}?${URL_PARAMS}`);

  return data;
}
