import poster404 from '../images/404.jpg';

export const createFilmMarkup = films =>
  films
    .map(({ id, poster_path, release_date, title, genresList }) => {
      let moviePosterPath = `https://image.tmdb.org/t/p/w400${poster_path}`;

      if (!poster_path) {
        moviePosterPath = poster404;
      }

      return `<li class="table-item film-card__item" data-id="${id}">
            <div class="card-thumb">
                <img class="card-img"
                src="${moviePosterPath}" 
                alt="${title}" 
                loading="lazy"
                />
            </div>
            <div class="card-desc">
                <p class="card-title">${title}</p>
                <p class="card-info">${genresList}<span class="card-year">${release_date.slice(
        0,
        4
      )}</span>
                </p>
            </div>
        </li>`;
    })
    .join('');
