import {defineStore} from 'pinia';
import { fetchRechercheYearOrGenre, fetchRechercheQuery, fetchMovieById } from '../services/MoviesService';

export const movieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    movieClicked: null,
    query: "",
    yearOrGenre: "",
    chargement: true,
  }),
  actions: {
    definirListeAccueil(listeTopFilms) {
      this.movies = listeTopFilms;
      this.chargement = false;
    },
    async definirListeSearch() {
      this.chargement = true;

      if (this.query && !this.yearOrGenre)
      {
        this.movies = await fetchRechercheQuery(this.query);
      }
      else if (this.query && this.yearOrGenre)
      {
        let moviesDataQuery = await fetchRechercheQuery(this.query);
        let moviesDataYearOrGenre = await fetchRechercheYearOrGenre(this.yearOrGenre);
        let moviesQueryList = []

        for (let movie of moviesDataQuery)
          {
            moviesQueryList.push(movie.id)
          }

          this.movies = moviesDataYearOrGenre.filter(findMovie);

        function findMovie(movie) {
          return moviesQueryList.includes(movie.id);
        }
      }
      else
      {
        this.movies = await fetchRechercheYearOrGenre(this.yearOrGenre);
      }
      this.chargement = false;
    },
    async getMovieByID(id) {
      this.chargement = true;
      this.movieClicked = await fetchMovieById(id);
      this.chargement = false;
    }
  },
  getters: {
    totalFilmsTrouves: (state) => state.movies.length,
    runtimeHours: (state) => {
      const runtime = parseInt(state.movieClicked.runtime);
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      if(hours === 0)
      {
        return `${minutes} minutes`;
      }
      return `${hours}h${minutes}`;
    }
  }
})
