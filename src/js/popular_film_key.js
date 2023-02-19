import axios from "axios";

export class MovieApiService {
  constructor({ per_page = 20 } = {}) {
    this.per_page = per_page;
  }

async axiosApiMovie(page) {

  console.log(this);

  const API_KEY = "36c444871f3c4ccb3f8770d789f46dd7";

  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`

       return await axios.get(URL).then(response => {
        console.log("response.data",response.data.results);

            console.log(response);


            return response;

        });
    };



};