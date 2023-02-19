import poster404 from '../images/404.jpg';
import MoviesApi from './movie-service';
const moviesApi = new MoviesApi();
const message = document.querySelector('.error-search');
const container = document.querySelector('.main-list');
export async function createMarkup(data) {
  if (data.results.length === 0) {
    message.classList.remove('is-hidden');
  } else {
    message.classList.add('is-hidden');
    // const genres = await moviesApi.fetchGenres().then((response) => response.genres);
    return data.results
      .map(({ id, poster_path, release_date, genre_ids, title }) => {
        // const genresList = genres.filter(e => genre_ids.includes(e.id))
        //   .map(e => e.name)
        //   .join(', ');
        let moviePosterPath = `https://image.tmdb.org/t/p/w400${poster_path}`;
        if (!poster_path) {
          moviePosterPath = poster404;
        }
        let movieData = '';
        if (release_date) {
          movieData = release_date.slice(0, 4);
        }
        const markup = `<li class="table-item film-card__item" data-id="${id}">
            <div class="card-thumb">
                <img class="card-img"
                src="${moviePosterPath}" 
                alt="${title}" 
                loading="lazy"
                />
            </div>
            <div class="card-desc">
                <p class="card-title">${title}</p>
                <p class="card-info">${GenresOfMovie(
                  genre_ids
                )}<span class="card-year">${movieData}</span></p>
            </div>
        </li> `;
        container.insertAdjacentHTML('beforeend', markup);
      })
      .join('');
  }
}

export function clearMarkup() {
  container.innerHTML = '';
}

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

function GenresOfMovie(ids) {
  const arr = ids.flatMap(id => genres.filter(element => element.id === id));

  let movieGenres = arr.map(genre => genre.name);

  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);

    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  if (movieGenres.length === 0) {
    return (movieGenres = 'Not found');
  }
  return movieGenres.join(', ');
}
