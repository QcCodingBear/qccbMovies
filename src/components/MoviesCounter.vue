<template>
  <div id="counter">
    <p id="counterText">Films trouvés : {{ movieStore.totalFoundMovies }}</p>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores";

const movieStore = useMovieStore();

</script>

<style scoped>
/*Source image welcomeBackground: https://giphy.com/gifs/southparkgifs-3o6ZsUNRUTKcG9mi8E*/
#counter {
  background-image: url('/src/assets/img/welcomeBackground.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  padding: 0.5rem;
  box-shadow:
    0 0 2px rgb(255, 255, 255),
    0 0 10px rgb(255, 223, 63),
    0 0 30px rgb(255, 193, 23);
  border-radius: 25px;
  margin-bottom: 2rem;
}

#counterText {
  margin: 0rem 1rem 0rem 1rem;
  font-family: Sixtyfour Convergence;
  text-shadow:
    0 0 0.5px rgb(252, 100, 100),
    0 0 1px rgb(255, 49, 49);
}

@media (min-width: 1024px) {
  #counter {
    margin: 2em 1em 2em 4em;
    width: fit-content;
  }
}
</style>
