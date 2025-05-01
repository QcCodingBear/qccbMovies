import { defineStore } from 'pinia'
import {
  fetchRechercheYearOrGenre,
  fetchRechercheQuery,
  fetchMovieById,
} from '../services/MoviesService'

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
    heavySearch: false,
    noResult: false
  }),
  actions: {

    async defineListSearch() {
      this.loading = true;

      if (this.query && this.genre) {
        await this.getMovieByQueryYearGenre();
      }

      else {
        const targetedPage = this.currentPage === 1 ? 1 : Math.floor(this.currentPage/2);
        const data = this.query && !this.genre ? await this.getMovieByQuery(targetedPage)
        : await this.getMovieByYearOrGenre(targetedPage);

        this.movies = data.movies;
        this.totalMovies = data.totalFilms ?? 0;
        if (this.totalMovies > 0)
        {
          const pagesCount = Math.ceil(this.totalMovies / 10);
          this.totalPages = pagesCount > 1000 ? 1000 : pagesCount;
        }
        this.noResult = this.totalMovies === 0 ? true : false;

      }

      this.loading = false
    },

    async getMovieByID(id) {
      this.loading = true
      this.movieClicked = await fetchMovieById(id)
      this.loading = false
    },

    async getMovieByQuery(page) {
      const search = this.query + this.year
      const data = await fetchRechercheQuery(search, page)
      return data
    },

    async getMovieByYearOrGenre(page) {
      const search = this.year + this.genre
      const data = await fetchRechercheYearOrGenre(search, page)
      return data
    },

    getMapByMoviesList() {
      let map = new Map()
      for (let movie of this.movies) {
        map.set(movie.id, movie)
      }
      return map
    },

    async getMovieByQueryYearGenre() {
      const BASE_SEARCH_PAGES = 50;
        const MAX_SEARCH_PAGES = 450;

        let dataQuery = []
        let dataYearOrGenre = []
        let dataMerge = this.heavySearch ? this.getMapByMoviesList() : new Map();
        let movieIdsQuery = new Set()
        this.heavySearch = true

        do {
          for (let i = 1; i < BASE_SEARCH_PAGES + this.seeMoreCounter; i++) {
            const queryData = await this.getMovieByQuery(i)
            if (queryData.movies.length === 0) i = BASE_SEARCH_PAGES + this.seeMoreCounter
            dataQuery.push(queryData)

            for (let dataQueryMovie of queryData.movies) {
              movieIdsQuery.add(dataQueryMovie.id)
            }
          }

          for (let i = 1 + this.seeMoreCounter; i < BASE_SEARCH_PAGES + this.seeMoreCounter; i++) {
            const yearOrGenreData = await this.getMovieByYearOrGenre(i)
            dataYearOrGenre.push(yearOrGenreData)
          }

          for (let dataYearOrGenrePage of dataYearOrGenre) {
            for (let movie of dataYearOrGenrePage.movies) {
              if (movieIdsQuery.has(movie.id)) {
                if (!dataMerge.has(movie.id)) {
                  dataMerge.set(movie.id, movie);
                }
              }
            }
          }
          this.seeMoreCounter += (dataMerge.size === this.movies.length && this.seeMoreCounter < MAX_SEARCH_PAGES) ? BASE_SEARCH_PAGES : 0;
        } while ((dataMerge.size === 0 && this.seeMoreCounter < MAX_SEARCH_PAGES) ||(dataMerge.size === this.movies.length && this.seeMoreCounter < MAX_SEARCH_PAGES));

        this.movies = Array.from(dataMerge.values());
        this.totalMovies = this.movies.length;
        if (this.totalMovies > 0)
          {
            const pagesCount = Math.ceil(this.totalMovies / 10);
            this.totalPages = pagesCount > 1000 ? 1000 : pagesCount;
          }
        this.noResult = dataMerge.size === 0 ? true : false;
    },

  },
  getters: {
    totalFoundMovies: (state) => state.totalMovies,

    runtimeHours: (state) => {
      const runtime = parseInt(state.movieClicked.runtime)
      const hours = Math.floor(runtime / 60)
      const minutes = runtime % 60
      return hours === 0 ? `${minutes} minutes` : `${hours}h${minutes}`;
    },
  },
})
