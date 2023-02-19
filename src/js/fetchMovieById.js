import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie/';

const searchParams = new URLSearchParams({
  api_key: 'a1735b4b403b356dec5f0993d9adcd8f',
  language: 'en-US',
});

export const fetchMovieById = async currentMovieId => {
  const url = `${currentMovieId}?${searchParams}`;
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
};
