<template>
  <form action="post" id="zoneRecherche" @submit.prevent>

    <input type="text" class="inputArea" v-model="valeurKeyWord" placeholder="Rechercher par mots-clés">
    <input type="text" class="inputArea" v-model="valeurYear" placeholder="Rechercher par année">
    <select id="optionGenre" name="choix" v-model="valeurGenre">
      <option value="" disabled>Genre</option>

      <option v-for="genre in props.genresMovies" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>

    </select>

    <button type="submit" @click="searchMovies()">Rechercher</button>

  </form>

</template>

<script setup>
import { ref } from 'vue';
import { movieStore } from '../stores';
import { useRouter } from 'vue-router';

const useMovieStore = movieStore();
const router = useRouter();
const valeurKeyWord = ref("");
const valeurYear = ref("");
const valeurGenre = ref("");

const props = defineProps({
  genresMovies: Array,
})

function searchMovies() {
  useMovieStore.query = "";
  useMovieStore.yearOrGenre = "";
  useMovieStore.accueil = false;

  if (valeurKeyWord.value) {
    useMovieStore.query += '&query=' + valeurKeyWord.value.trim();
  }

if (valeurYear.value) {
  useMovieStore.yearOrGenre += '&primary_release_year=' + valeurYear.value.trim();
}
if (valeurGenre.value) {
  useMovieStore.yearOrGenre += '&with_genres=' + valeurGenre.value.toString();
}

  useMovieStore.definirListeSearch();

  router.push({ name: 'searchMovies' });
}

</script>

<style scoped>
  /* Source effet neon :https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */
#zoneRecherche {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#optionGenre {
  margin: 5px;
}

.inputArea {
  width: 80%;
  margin: 5px;
}

button,
#optionGenre {
  background-color: rgb(32, 32, 32);
  color: white;
  border: 2px solid rgb(162, 23, 255);
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgb(162, 23, 255);
}

button:hover,
#optionGenre:hover,
#choix:hover {
  background-color: rgb(49, 49, 49);
  transform: scale(1.1);
  box-shadow:
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255);
}

select,
button,
label #choix,
#optionGenre,
input[type="text"] {
  background-color: black;
  color: white;
  border: 2px solid #0ff;
  border-radius: 8px;
  font-size: 16px;
  padding: 10px;
  box-shadow: 0 0 5px rgb(40, 72, 255),
    0 0 10px rgb(40, 72, 255),
    0 0 20px rgb(40, 72, 255),
    0 0 30px rgb(40, 72, 255),
    0 0
}
</style>
