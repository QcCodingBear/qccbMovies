<template>

  <div  id="hautPage">
  <MoviesCounter />

  <MovieResume v-for="movie in moviesByPage" :movie="movie" v-bind:key="movie.id" />

    <div v-if="useMovieStore.pageActuelle === useMovieStore.totalPages && useMovieStore.seeMore < 450" id="buttons">
      <button  @click="voirPlus('precedent')" class='neonButton'>Voir Plus</button>
    </div>

    <div v-if="useMovieStore.heavySearch" id="buttons">
    <button :disabled="useMovieStore.pageActuelle <= 1" @click="changerPage('precedent')"
      :class="useMovieStore.pageActuelle <= 1 ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>

    <button :disabled="useMovieStore.pageActuelle === useMovieStore.totalPages" @click="changerPage('suivant')"
      :class="useMovieStore.pageActuelle === useMovieStore.totalPages  ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>

  <div v-else id="buttons">
    <button :disabled="useMovieStore.pageActuelle <= 1" @click="changerPage('precedent')"
      :class="useMovieStore.pageActuelle <= 1 ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>

    <button :disabled="useMovieStore.pageActuelle >= Math.ceil(useMovieStore.totalPages * 2)" @click="changerPage('suivant')"
      :class="useMovieStore.pageActuelle >= Math.ceil(useMovieStore.totalPages * 2) ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>
</div>
</template>

<script setup>
import MovieResume from "../components/MovieResume.vue";
import MoviesCounter from "../components/MoviesCounter.vue";
import { computed } from "vue";
import { onMounted } from 'vue';
import { movieStore } from "../stores";

const MOVIES_BY_PAGE = 10;
const useMovieStore = movieStore();

onMounted(() => {
  document.title = 'QcCB Movies - Recherche';
});




////////////////////////////////////////////////////////////////////////////////
const moviesByPage = computed(() => {

let start = 0;

  if(!useMovieStore.heavySearch)
{
  start = (useMovieStore.pageActuelle % 2 === 0) ? MOVIES_BY_PAGE : 0;
}
else if (useMovieStore.pageActuelle > 1){
  start = useMovieStore.pageActuelle * MOVIES_BY_PAGE - 10;
}

const end = start + MOVIES_BY_PAGE;

  return moviesInstant.value.slice(start, end);
});
/////////////////////////////////////////////////////////////////////////////////////





const moviesInstant = computed(() => {
  return useMovieStore.movies;
});

// Source window.scroll : https://developer.mozilla.org/fr/docs/Web/API/Window/scrollBy
function changerPage(operation) {

  useMovieStore.pageActuelle = operation === 'precedent' ? useMovieStore.pageActuelle - 1 : useMovieStore.pageActuelle + 1;

  if (!useMovieStore.heavySearch)
  {
    useMovieStore.definirListeSearch();
  }

  window.scroll({
  top: 0,
  behavior: "smooth",
});
}

function voirPlus() {
  useMovieStore.seeMore += 50;
  useMovieStore.definirListeSearch();
}

</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */

.neonButton {
  color: white;
  background-color: black;
  border: 2px solid #0ff;
  padding: 10px;
  width: 150px;
  margin: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgb(162, 23, 255),
    0 0 5px rgb(40, 72, 255),
    0 0 10px rgb(40, 72, 255),
    0 0 20px rgb(40, 72, 255),
    0 0 30px rgb(40, 72, 255),
    0 0
}

.neonButton:hover {
  background-color: rgb(49, 49, 49);
  transform: scale(1.1);
  box-shadow:
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255);
}

.neonButtonDisabled {
  color: rgb(97, 95, 95);
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid rgb(97, 97, 97);
  padding: 10px;
  width: 150px;
  margin: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}


#buttons {
  display: flex;
  justify-content: center;
  margin: 25px;
}
</style>
