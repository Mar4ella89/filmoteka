export const createWatched = filmsWatched =>
  filmsWatched
    .map(
      ({
        id,
        poster_path,
        release_date,
        title,
        genresList,
      }) => `<li class="table-item film-card__item" data-id="${id}">
            <div class="card-thumb">
                <img 
                src="https://image.tmdb.org/t/p/w400${poster_path}" 
                alt="${title}" 
                loading="lazy"
                />
            </div>
            <div class="card-desc">
                <p class="card-title">${title}</p>
                <p class="card-info">${genresList}
                    <span class="card-year">${release_date.slice(0, 4)}</span>
                </p>
            </div>
        </li>`
    )
    .join('');
