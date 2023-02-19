import { MovieApiService } from "./popular_film_key";


// const searchFormRef = document.querySelector("#search-form");

const galleryContainer = document.querySelector(".main-list");

const movieApiService  = new MovieApiService();

renderImg();

function renderImg() {
  movieApiService.axiosApiMovie().then(movies => {
  const allMovies = movies.data.results;  

  // const markup = allMovies.map((movie) =>
  //     `<li class="table-item film-card__item" data-id="${movie.id}">
  //           <div class="card-thumb">
  //               <img 
  //               src="https://image.tmdb.org/t/p/w400${movie.poster_path}" 
  //               alt="${movie.title}" 
  //               loading="lazy"
  //               />
  //           </div>
  //           <div class="card-desc">
  //               <p class="card-title">${movie.title}</p>
  //               <p class="card-info">${GenresOfMovie(movie.genre_ids)}<span class="card-year">${movie.release_date.slice(0,4)}</span></p>
  //           </div>
  //       </li>`

  //   )
  //   .join("");


    galleryContainer.insertAdjacentHTML("beforeend", markup);
  })
  .catch(error => {
    console.log(error);

  });

};

const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" },
  { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" },
  { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" },
  { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" },
  { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" },
  { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" },
  { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];

// function GenresOfMovie(ids) {
//   const arr = ids.flatMap(id => genres.filter(element => element.id === id));

//   let movieGenres = arr.map(genre => genre.name);

//   if (movieGenres.length > 2) {
//     const removedGenres = movieGenres.splice(0, 2);

//     removedGenres.push('Other');

//     return removedGenres.join(', ');
//   }
//  if (movieGenres.length === 0) {
//     return (movieGenres = 'Not found');
//   }
//   return movieGenres.join(', ');
// }