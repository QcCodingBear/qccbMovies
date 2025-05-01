<template>
  <form action="post" id="searchArea" @submit.prevent="searchMovies()">

    <input type="text" class="inputArea" v-model="keyWord" placeholder="Rechercher par mots-clés">
    <input type="text" class="inputArea" v-model="year" placeholder="Rechercher par année">
    <select id="optionGenre" name="optionGenre" v-model="genre">
      <option value="" disabled>Genre</option>
      <option value="">Tous</option>
      <option v-for="genre in genresMovies" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>

    </select>
    <button type="submit">Rechercher</button>

  </form>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMovieStore } from '../stores';
import { useRouter } from 'vue-router';
import { fetchGenres } from '@/services/MoviesService';

const movieStore = useMovieStore();
const router = useRouter();
const keyWord = ref("");
const year = ref("");
const genre = ref("");

const genresMovies = ref([]);

async function fetchData() {
  const genresData = await fetchGenres();
  genresMovies.value = genresData;
}

onMounted(() => {
  fetchData();
})

function resetValues() {
  movieStore.query = "";
  movieStore.year = "";
  movieStore.genre = "";
  movieStore.seeMoreCounter = 0;
  movieStore.movies = [];
  movieStore.currentPage = 1;
  movieStore.heavySearch = false;
}

function searchMovies() {

  resetValues();

  if (keyWord.value) {
    movieStore.query = '&query=' + keyWord.value.trim();
  }

  if (year.value) {
    movieStore.year = '&primary_release_year=' + year.value.trim();
  }
  if (genre.value) {
    movieStore.genre = '&with_genres=' + genre.value.toString();
  }
  movieStore.defineListSearch();

  // Reinitialise les valeurs de la barre de recherche
  keyWord.value = "";
  year.value = "";
  genre.value = "";

  router.push({ name: 'searchMovies' });
}

</script>

<style scoped>
button {
  margin-top: 2em;
  height: 5em;
}

button,
#optionGenre {
  border: 2px solid rgb(162, 23, 255);
  margin: 5px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgb(162, 23, 255);
}

button:hover,
#optionGenre:hover{
  background-color: rgb(49, 49, 49);
  transform: scale(1.1);
  box-shadow:
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255);
}

select,
button,
#optionGenre,
input[type="text"] {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 2px solid #0ff;
  border-radius: 8px;
  font-size: 16px;
  padding: 1em;
  margin-top: 1em;
  box-shadow: 0 0 5px rgb(40, 72, 255),
    0 0 10px rgb(40, 72, 255),
    0 0 20px rgb(40, 72, 255),
    0 0 30px rgb(40, 72, 255);
}

.inputArea,
#optionGenre,
button {
  width: 100%;
}

#searchArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

@media (min-width: 1024px) {
  button {
    height: fit-content;
  }

  select,
  button,
  #optionGenre,
  input[type="text"] {
    padding: 10px;
    margin-top: 0;
  }

  .inputArea,
  #optionGenre,
  button {
    width: auto;
  }

  .inputArea {
    width: 80%;
    margin: 5px;
  }

  #searchArea {
    display: flex;
    flex-direction: row;
  }
}
</style>
