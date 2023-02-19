import poster404 from '../images/404.jpg';

const imgURL = 'https://image.tmdb.org/t/p';

export const modalWindowMovieMarkup = ({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genres,
  id,
}) => {
  let posterMovie = `${imgURL}/w400${poster_path}`;
  if (!poster_path) {
    posterMovie = poster404;
  }
  return ` <div class="modal-movie__img-wrapper">
      <img width=240
        src="${posterMovie}"
        alt="${title}"

        class="modal-movie__img"
      />

        <button type="button" class="modal-trailer-button" data-modal-trailer-open>

      </button>
    </div>

      <div class="modal-content-wrapper">
        <h2 class="modal-movie__title">${title.toUpperCase()}</h2>
      <div class="modal-movie__info">

        <div class="modal-movie__list-specifications">
                <p class="modal-movie__specifications-name">Vote / Votes</p><p class="modal-movie__list-values"><span class="modal-movie__item-vote">${vote_average}</span
                ><span class="slash"> / </span
                ><span class="modal-movie__item-votes">${vote_count}</span></p></div>
              <div class="modal-movie__list-specifications">
                <p class="modal-movie__specifications-name">Popularity</p><p class="modal-movie__list-values">${popularity}</p></div>
              <div class="modal-movie__list-specifications">
                <p class="modal-movie__specifications-name">Original Title</p><p class="modal-movie__list-values">${original_title.toUpperCase()}</p></div>
              <div class="modal-movie__list-specifications">
                <p class="modal-movie__specifications-name">Genre</p><p class="modal-movie__list-values">${genres
                  .map(genre => genre.name)
                  .join(', ')}</p></div>
            </div>

      <h3 class="modal-movie__subtitle">About</h3>
      <p class="modal-movie__text">
        ${overview}
      </p>
      <div class="modal-movie__btn-wrapper">
        <button data-id="${id}" type="button"  class="modal-btn modal-movie__btn-watched">
             ${
               JSON.parse(localStorage.filmsWatched).some(
                 data => data.id === Number(id)
               )
                 ? 'remove from watched'
                 : 'add to watched'
             }
        </button>
        <button data-id="${id}" type="button" class="modal-btn modal-movie__btn-queue">
          ${
            JSON.parse(localStorage.filmsQueue).some(
              data => data.id === Number(id)
            )
              ? 'remove from queue'
              : 'add to queue'
          }
        </button>
      </div>
      </div>
      `;
};

export const modalMovieTrailerMarkup = key =>
  `
<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `;

export const missingVideo = () =>
  `<div class="missing-video-text">Sorry, there is no trailer for this movie :(</div>`;
