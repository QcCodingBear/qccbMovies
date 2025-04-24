<template>

  <MovieWelcome />
  <MovieResume v-for="movie in props.movies" :movie="movie" v-bind:key="movie.id" />

</template>

<script setup>
import MovieResume from "../components/MovieResume.vue";
import MovieWelcome from "../components/MovieWelcome.vue";
import { onMounted } from 'vue';

const props = defineProps({
  movies: Array,
})

onMounted(() => {
  document.title = 'QcCB Movies - Accueil';
});

</script>

<style scoped>
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */
</style>
