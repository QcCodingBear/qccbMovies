<script setup>
import MovieSearch from './components/MovieSearch.vue';
import { RouterView } from 'vue-router'

import { ref, onMounted } from 'vue';
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



</script>

<template>
  <header>
    <a href="/"><img src="/src/assets/img/banniere.png" alt="Banniere" id="banniere"></a>
    <nav>
      <MovieSearch :genresMovies='genresMovies' />
    </nav>
  </header>
  <main>
    <RouterView />
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

main {
  max-height: fit-content;
}

#banniere {
  max-width: 100%;
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
