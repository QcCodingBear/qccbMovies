<template>

  <MovieWelcome v-if="useMovieStore.accueil"/>

  <div v-for="movie in moviesByPage" v-bind:key="movie.id" class="vignetteFilm">

    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="imageFilm" id="imageVignette">

    <div id="texteVignette">
      <p>Titre: {{ movie?.title }}</p>
      <p>Date de sortie: {{ movie?.release_date }}</p>
    </div>

  </div>

  <div id="buttons">
    <button :disabled="pageActuelle <= 1" @click="changerPage('precedent')"
      :class="pageActuelle <= 1 ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>
    <button :disabled="pageActuelle >= (props.movies.length / 10)" @click="changerPage('suivant')"
      :class="pageActuelle >= (props.movies.length / 10) ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>

</template>

<script setup>
import MovieWelcome from "../components/MovieWelcome.vue";
import { movieStore } from "../stores";
import { ref, computed } from "vue";

const MOVIES_BY_PAGE = 10;
const useMovieStore = movieStore();

let pageActuelle = ref(1);

const props = defineProps({
  movies: Array,
})

const moviesByPage = computed(() => {
  const start = (pageActuelle.value - 1) * MOVIES_BY_PAGE;
  const end = start + MOVIES_BY_PAGE;
  return props.movies.slice(start, end);
});

const nombreDePages = computed(() => {
  return Math.ceil(props.movies.length / MOVIES_BY_PAGE);
});

function changerPage(operation) {
  if (operation === 'precedent' && pageActuelle.value >= 2) { pageActuelle.value-- }
  if (operation === 'suivant' && pageActuelle.value < nombreDePages.value) { pageActuelle.value++ }
}

</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */

.vignetteFilm {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin: 10px;
  box-shadow:
    0 0 5px rgb(162, 23, 255),
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
  border-radius: 10px;
  background-color: rgb(32, 32, 32);
}

.vignetteFilm:hover {
  background-color: rgb(49, 49, 49);
}

#texteVignette {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

#imageVignette {
  max-height: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

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
