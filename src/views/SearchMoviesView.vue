<template>

<div v-if="!loading">
  <MoviesCounter v-if="!noMovieFound"/>
  <NoMoviesFound v-else />

  <MovieResume v-for="movie in moviesByPage" :movie="movie" v-bind:key="movie.id" />


  <ButtonsSearch v-if="!noMovieFound"/>
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

// Retourne une copie segmentée de la liste complete, pour afficher que 10 films par page.
const moviesByPage = computed(() =>{
  const start = !movieStore.mergedSearch ? ((movieStore.currentPage % 2 === 0) ? MOVIES_BY_PAGE : 0)
  : (movieStore.currentPage > 1 ? (movieStore.currentPage * MOVIES_BY_PAGE - 10) : 0);
  const end = start + MOVIES_BY_PAGE;

  return moviesInstant.value.slice(start, end);
});

const moviesInstant = computed(() => {
  return movieStore.movies;
});

const noMovieFound = computed(() => {
  return movieStore.noMovieFound;
});

const loading = computed(() => {
  return movieStore.loading;
})
</script>

<style scoped>

</style>
