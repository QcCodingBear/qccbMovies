<script setup>
import MoviesList from './views/MoviesView.vue';
import MovieSearch from './components/MovieSearch.vue';

import { ref, onMounted, computed } from 'vue';
import { fetchTopMovies, fetchGenres } from '@/services/MoviesService';
import { movieStore } from './stores';

const genresMovies = ref([]);
const useMovieStore = movieStore();

async function fetchData() {
  const moviesData = await fetchTopMovies();
  const genresData = await fetchGenres();
  moviesData.value = recupererTopMovies(moviesData);
  useMovieStore.definirListeAccueil(moviesData.value);
  genresMovies.value = genresData;
}

onMounted(() => {
  fetchData();
})

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

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function comparerParDate(a, b) { 
  const dateA = new Date(a.release_date);
  const dateB = new Date(b.release_date);
  return dateB - dateA;
}

const chargement = computed(() => {
  return useMovieStore.chargement;
})

</script>

<template>
  <header>
    <a href="/"><img src="/img/banniere.png" alt="Banniere" id="banniere"></a>
    <nav>
      <MovieSearch :genresMovies='genresMovies' />
    </nav>
  </header>
  <main>
    <div id="loading" v-if="chargement">
      <p id="textLoading">x - Chargement - x</p>
    </div>
    <MoviesList :movies="useMovieStore.movies" v-if="!chargement" />
  </main>

</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
}

#banniere {
  max-width: 100%;
}

#loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-image: url('/img/loading.gif'); /*https://www.reddit.com/r/PixelArt/comments/m1xwcp/back_to_the_future/?rdt=33217 */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 800px;
  position: relative;
  padding-top: 100px; 
}

#textLoading {
  font-family: "Silkscreen";
  font-size: 5rem;
  color: #ffd8d8;
  text-shadow: /* https://www.youtube.com/watch?v=BDO_xNCw6wU */
  .1vw 0vw .25vw #ffd8d8, .2vw 0vw .25vw #ffd8d8, .4vw 0vw .25vw #ffd8d8,

  .1vw 0vw  0vw #f25757, .2vw 0vw  0vw #f25757, .4vw 0vw  0vw #f25757,
  .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757, .4vw 0vw .1vw #f25757,
  .1vw 0vw  2vw #f25757, .2vw 0vw  2vw #f25757, .4vw 0vw  2vw #f25757,

  .1vw 0vw  1vw #e50b0b, .2vw 0vw  1vw #e50b0b, .4vw 0vw  5vw #e50b0b,
  .1vw 0vw  5vw #e50b0b, .2vw 0vw 20vw #e50b0b, .4vw 0vw 10vw #e50b0b,
  .1vw 0vw 10vw #e50b0b, .2vw 0vw 30vw #e50b0b, .4vw 0vw 10vw #e50b0b;
}

@media (min-width: 1024px) {

  nav {
    font-size: 25px;
    max-height: 50px;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 10px;
    background-color: black;

  }
}
</style>
