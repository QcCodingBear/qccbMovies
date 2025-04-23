import {defineStore} from 'pinia';
import { fetchRechercheYearOrGenre, fetchRechercheQuery } from '../services/MoviesService';

export const movieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    query: "",
    yearOrGenre: "",
    chargement: true,
    accueil: true
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
    }
  },
  getters: {

  }
})