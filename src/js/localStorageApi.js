import { createFilmMarkup } from './createFilmMarkup';

export class LocalStorageApi {
  constructor(key) {
    this.key = key;
  }

  createsDataModel() {
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  async saveData({ id, poster_path, release_date, title, genres }) {
    const movieData = {
      id,
      poster_path,
      release_date,
      title,
      genresList: `${genres
        .map(({ name }) => name)
        .slice(0, 2)
        .join(', ')}${genres.length > 2 ? ', Other' : ''}`,
    };

    localStorage.setItem(
      this.key,
      JSON.stringify([...JSON.parse(localStorage.getItem(this.key)), movieData])
    );
  }

  removeData({ id }) {
    const updatedMovies = JSON.parse(localStorage.getItem(this.key)).filter(
      movie => movie.id != id
    );

    localStorage.removeItem(this.key);

    localStorage.setItem(this.key, JSON.stringify(updatedMovies));
  }

  render(filmsList, films) {
    filmsList.innerHTML = createFilmMarkup(films);
  }
}
