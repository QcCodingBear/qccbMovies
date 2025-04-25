<template>

  <MovieWelcome />
  <MovieResume v-for="movie in useMovieStore.movies" :movie="movie" v-bind:key="movie.id" />

</template>

<script setup>
import MovieResume from "../components/MovieResume.vue";
import MovieWelcome from "../components/MovieWelcome.vue";
import { onMounted } from 'vue';
import { movieStore } from "../stores";

const useMovieStore = movieStore();

onMounted(() => {
  document.title = 'QcCB Movies - Accueil';
});

</script>

<style scoped>
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */
</style>
