<template>
  <div id="counter">
    <p id="counterText">Films trouvés : {{nombreFilms}}</p>
  </div>
</template>

<script setup>
import { movieStore } from "../stores";
import { computed } from "vue";

const useMovieStore = movieStore();

const nombreFilms = computed(() => {
  return useMovieStore.totalFilmsTrouves;
})
</script>

<style scoped>

#counter {
  background-image: url('/src/assets/img/welcomeBackground.webp'); /*https://giphy.com/gifs/southparkgifs-3o6ZsUNRUTKcG9mi8E*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  padding: 0.5rem;
  box-shadow:
  0 0 2px rgb(255, 255, 255),
  0 0 2px rgb(244, 255, 205),
    0 0 5px rgb(255, 223, 63),
    0 0 10px rgb(255, 223, 63),
    0 0 20px rgb(255, 193, 23);
  border-radius: 25px;
  margin: 1rem;;
  margin-bottom: 2rem;
  width: fit-content;
}

#counterText {
  margin: 0rem 1rem 0rem 1rem;
  font-family: Sixtyfour Convergence;
  text-shadow:
  0 0 0.5px rgb(252, 100, 100),
  0 0 1px rgb(255, 49, 49);

}
</style>
