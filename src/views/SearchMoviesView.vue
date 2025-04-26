<template>

<div v-if="!loading">
  <MoviesCounter v-if="!noResult"/>
  <NoMovies v-else />

  <MovieResume v-for="movie in moviesByPage" :movie="movie" v-bind:key="movie.id" />


  <ButtonsSearch v-if="!noResult"/>
</div>
<div  v-else>
  <LoadingScreen />
</div>


</template>

<script setup>
import MovieResume from "../components/MovieResume.vue";
import MoviesCounter from "../components/MoviesCounter.vue";
import ButtonsSearch from "../components/ButtonsSearch.vue";
import NoMovies from "../components/NoMovies.vue";
import LoadingScreen from '../components/LoadingScreen.vue';
import { computed } from "vue";
import { onMounted } from 'vue';
import { movieStore } from "../stores";

const MOVIES_BY_PAGE = 10;
const useMovieStore = movieStore();

onMounted(() => {
  document.title = 'QcCB Movies - Recherche';
});

const moviesByPage = computed(() => {
  const start = !useMovieStore.heavySearch ? ((useMovieStore.pageActuelle % 2 === 0) ? MOVIES_BY_PAGE : 0)
  : (useMovieStore.pageActuelle > 1 ? (useMovieStore.pageActuelle * MOVIES_BY_PAGE - 10) : 0);
  const end = start + MOVIES_BY_PAGE;
  return moviesInstant.value.slice(start, end);
});

const moviesInstant = computed(() => {
  return useMovieStore.movies;
});

const noResult = computed(() => {
  return useMovieStore.noResult;
});

const loading = computed(() => {
  return useMovieStore.chargement;
})
</script>

<style scoped>

</style>
