import { defineStore } from 'pinia'
import { fetchMovies, fetchMovieById } from '../services/MoviesService'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    totalMovies: 0,
    currentPage: 1,
    totalPages: 0,
    seeMoreCounter: 0,
    movieClicked: null,
    query: '',
    year: '',
    genre: '',
    loading: true,
    mergedSearch: false,
    noMovieFound: false,
  }),

  actions: {
    async getMovieByID(id) {
      this.loading = true;
      this.movieClicked = await fetchMovieById(id);
      this.loading = false;
    },

    async getMoviesByQuery(page) {
      const search = this.query + this.year;
      const data = await fetchMovies('search', search, page);
      return data;
    },

    async getMoviesByYearOrGenre(page) {
      const search = this.year + this.genre;
      const data = await fetchMovies('discover', search, page);
      return data;
    },

    getMapByMoviesList() {
      let map = new Map();
      for (let movie of this.movies) {
        map.set(movie.id, movie);
      };
      return map;
    },

    async getMoviesByQueryYearGenre() {
      // TMDB n'autorise la recherche que jusqu'à la page 500.
      const MAX_SEARCH_PAGES = 500;
      const BASE_SEARCH_PAGES = 50;

      // Source Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
      // Utilisé ici afin de pouvoir faire des combinaisons rapides de film et Id.
      let dataMerge = this.mergedSearch ? this.getMapByMoviesList() : new Map();

      //Source Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
      // Utilisé ici pour éviter les doublons d'Ids, toujours afin de fluidifier la recherche.
      let movieIdsQuery = new Set();
      let dataYearOrGenre = [];
      this.mergedSearch = true;

      do {
        async function getMoviesIds(movieStore) {
          for (let i = 1; i < BASE_SEARCH_PAGES + movieStore.seeMoreCounter; i++) {
            const queryData = await movieStore.getMoviesByQuery(i);

            // Si aucun film n'est trouvé, inutile de continuer la boucle, la recherche sera la même peu importe la page.
            if (queryData.movies.length === 0) i = BASE_SEARCH_PAGES + movieStore.seeMoreCounter;

            for (let dataQueryMovie of queryData.movies) {
              movieIdsQuery.add(dataQueryMovie.id);
            }
          }
        }

        async function getMoviesByYearOrGenreByRange(movieStore) {
          for (
            let i = 1 + movieStore.seeMoreCounter;
            i < BASE_SEARCH_PAGES + movieStore.seeMoreCounter;
            i++
          )
          {
            const yearOrGenreData = await movieStore.getMoviesByYearOrGenre(i);
            dataYearOrGenre.push(yearOrGenreData);
          }
        }

        // Récupération en parallele des deux listes.
        await Promise.all([getMoviesIds(this), getMoviesByYearOrGenreByRange(this)]);

        for (let dataYearOrGenrePage of dataYearOrGenre)
          {
          for (let movie of dataYearOrGenrePage.movies)
            {
            if (movieIdsQuery.has(movie.id))
            {
                // Si l'id du film n'est pas déja présente, on rajoute le film associé à l'ID dans la map.
              if (!dataMerge.has(movie.id)) dataMerge.set(movie.id, movie);
            };
          };
        };

        // Si la map n'a pas acquis de nouveau film, et si le compteur de page supplémentaire est en dessous de la limite imposée par TMDB,
        // on augmente le nombre de pages de 50, et ce jusqu'à ce qu'a trouver au moins un film, ou atteindre la limite de page.
        this.seeMoreCounter +=
          dataMerge.size === this.movies.length && this.seeMoreCounter < MAX_SEARCH_PAGES
            ? BASE_SEARCH_PAGES
            : 0;

      } while (
        (dataMerge.size === 0 && this.seeMoreCounter < MAX_SEARCH_PAGES) ||
        (dataMerge.size === this.movies.length && this.seeMoreCounter < MAX_SEARCH_PAGES)
      );

      this.movies = Array.from(dataMerge.values());
      this.totalMovies = this.movies.length;

      if (this.totalMovies > 0)
      {
        const pagesCount = Math.ceil(this.totalMovies / 10);
        this.totalPages = pagesCount > 1000 ? 1000 : pagesCount;
      }

      this.noMovieFound = dataMerge.size === 0 ? true : false;
    },

    async defineListSearch() {
      this.loading = true;

      // Recherche par Mot-Clé et Genre.
      if (this.query && this.genre) {
        await this.getMoviesByQueryYearGenre();

        // Recherche par Mot-clé+Date ou Genre+Date.
      } else {
        const targetedPage = this.currentPage === 1 ? 1 : Math.ceil(this.currentPage / 2);
        const data =
          this.query && !this.genre
            ? await this.getMoviesByQuery(targetedPage)
            : await this.getMoviesByYearOrGenre(targetedPage);

        this.movies = data.movies;
        this.totalMovies = data.totalFilms ?? 0;

        if (this.totalMovies > 0)
        {
          const pagesCount = Math.ceil(this.totalMovies / 10);
          this.totalPages = pagesCount > 1000 ? 1000 : pagesCount;
        };

        this.noMovieFound = this.totalMovies === 0 ? true : false;
      }

      this.loading = false;
    },
  },

  getters: {
    totalFoundMovies: (state) => state.totalMovies,

    runtimeHours: (state) => {
      const runtime = parseInt(state.movieClicked.runtime);
      const hours = Math.floor(runtime / 60);
      const minutesRaw = runtime % 60;
      const minutes = minutesRaw < 10 ? '0' + minutesRaw : minutesRaw;
      return hours === 0 ? `${minutes} minutes` : `${hours}h${minutes}`;
    },
  },
})
