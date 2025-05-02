<template>

<div v-if="!loading">
  <MoviesCounter v-if="!noResult"/>
  <NoMoviesFound v-else />

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
import NoMoviesFound from "../components/NoMoviesFound.vue";
import LoadingScreen from '../components/LoadingScreen.vue';
import { computed } from "vue";
import { onMounted } from 'vue';
import { useMovieStore } from "../stores";

const MOVIES_BY_PAGE = 10;
const movieStore = useMovieStore();

onMounted(() => {
  document.title = 'QcCB Movies - Recherche';
});

const moviesByPage = computed(() => {
  const start = !movieStore.heavySearch ? ((movieStore.currentPage % 2 === 0) ? MOVIES_BY_PAGE : 0)
  : (movieStore.currentPage > 1 ? (movieStore.currentPage * MOVIES_BY_PAGE - 10) : 0);
  const end = start + MOVIES_BY_PAGE;
  return moviesInstant.value.slice(start, end);
});

const moviesInstant = computed(() => {
  return movieStore.movies;
});

const noResult = computed(() => {
  return movieStore.noResult;
});

const loading = computed(() => {
  return movieStore.loading;
})
</script>

<style scoped>

</style>
