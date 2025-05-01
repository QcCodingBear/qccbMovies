<template>

  <MovieWelcome />
  <MovieResume v-for="movie in movieStore.movies" :movie="movie" v-bind:key="movie.id" />

</template>

<script setup>
import MovieResume from "../components/MovieResume.vue";
import MovieWelcome from "../components/MovieWelcome.vue";
import { onMounted } from 'vue';
import { useMovieStore } from "../stores";
import { fetchTopMovies } from '@/services/MoviesService';

const movieStore = useMovieStore();

async function fetchData() {
  const moviesData = await fetchTopMovies();
  moviesData.value = recupererTopMovies(moviesData);
  movieStore.movies = moviesData.value;
  movieStore.loading = false;
}

onMounted(() => {
  document.title = 'QcCB Movies - Accueil';
  fetchData();
});

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function comparerParDate(a, b) {
  const dateA = new Date(a.release_date);
  const dateB = new Date(b.release_date);
  return dateB - dateA;
}


function recupererTopMovies(listeMovies) {

const NOMBRE_TOP_FILMS = 3;
// Pour obtenir la date du jour au meme format que dans l'API afin de ne pas avoir de film pas encore sortis.
const DATE_DU_JOUR = new Date().toLocaleDateString().split('/').reverse().join('-');
const topMovies = [];

listeMovies.sort(comparerParDate);

for (let i = 0; topMovies.length < NOMBRE_TOP_FILMS; i++) {
  if (listeMovies[i].release_date < DATE_DU_JOUR) {
    topMovies.push(listeMovies[i]);
  }
}

return Array.from(topMovies);
}

</script>

<style scoped>

</style>
