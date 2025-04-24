<template>
  <div>
    <h2>{{ movie.title }}</h2>
    <img :src="imageOrNull(movie.poster_path)" alt="poster">
    <p id="description">Description : {{movie.overview}}</p>
    <p id="note">Note : {{movie.vote_average}} / 10</p>
    <p id="duree">Durée : {{useMovieStore.runtimeHours}}</p>
    <img :src="imageOrNull(movie.backdrop_path)" alt="backdrop">
  </div>
</template>

<script setup>
import { movieStore } from '../stores';

const BASE_URL = 'https://image.tmdb.org/t/p/w500';
const NO_RESULT = '../src/assets/img/noImage.png';
const useMovieStore = movieStore();

function imageOrNull(imagePath) {
  const chemin = imagePath ? BASE_URL + imagePath : NO_RESULT;
  return chemin
}

defineProps({
  movie: Object,
})

</script>

<style lang="scss" scoped>

</style>
