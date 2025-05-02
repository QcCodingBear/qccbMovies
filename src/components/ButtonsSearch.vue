<template>
<div v-if="movieStore.mergedSearch && movieStore.currentPage === movieStore.totalPages
&& movieStore.seeMoreCounter < 450" class="buttons">
    <button @click="seeMoreMovies" class='neonButton' id="moreResults">Afficher plus de Résultats</button>
  </div>

  <div class="buttons">
    <button :disabled="currentFirstPage" @click="changePage('back')"
      :class="currentFirstPage ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>

    <div class="pagesCounter">
      <p>Page</p>
      <input type="text" v-model="goPage" :placeholder="movieStore.currentPage">
      <p id="maxCounter">/{{ movieStore.totalPages }}</p>
    </div>

    <button :disabled="currentLastPge" @click="changePage('next')"
      :class="currentLastPge ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>

  <form action="post" v-if="movieStore.totalPages > 0" class="goPage" @submit.prevent="goChangePage()">
    <button type="submit"
      :class="goPage > movieStore.totalPages || goPage <= 0 || isNaN(goPage) ? 'neonButtonDisabled' : 'neonButton'"
      id="goButton">Aller à la page</button>
  </form>

</template>

<script setup>
// Source window.scroll : https://developer.mozilla.org/fr/docs/Web/API/Window/scroll

import { useMovieStore } from "../stores";
import { ref, computed } from "vue";

const movieStore = useMovieStore();
const goPage = ref();

const currentFirstPage = computed(() => {
  return movieStore.currentPage <= 1;
})

const currentLastPge = computed(() => {
  return movieStore.currentPage >= movieStore.totalPages;
})

// Ne charge pas la suite de la liste si c'est une recherche comparant 2 listes.
async function defineSearchListOrNot() {
  if (!movieStore.mergedSearch) await movieStore.defineListSearch();
}

async function changePage(operation) {
  movieStore.currentPage = operation === 'back' ? movieStore.currentPage - 1 : movieStore.currentPage + 1;

  await defineSearchListOrNot();

  window.scroll({
    top: 0,
    behavior: "smooth"
  });
}

// Ajoute 50 pages à la recherche.
async function seeMoreMovies() {
  movieStore.seeMoreCounter += 50;
  await movieStore.defineListSearch();

  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}


async function goChangePage() {
  if (goPage.value <= movieStore.totalPages && goPage.value >= 1 && !isNaN(goPage.value)) {
    movieStore.currentPage = parseInt(goPage.value);

    await defineSearchListOrNot();

    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }
}

</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */
/*Source focus::placeholder: https://stackoverflow.com/questions/13183421/how-to-change-placeholder-color-on-focus */

input {
  background-color: rgb(0, 0, 0);
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 0.7em 0 0.7em 0;
  border: 2px solid rgb(255, 0, 0);
  box-shadow: 0 0 5px rgb(255, 40, 40),
    0 0 10px rgb(255, 40, 40);
  border-radius: 8px;
  width: auto;
  box-sizing: border-box;
  min-width: 3ch;
  max-width: 5ch;

}

input::placeholder {
  color: rgb(255, 103, 103);
  font-weight: bold;
}

input:focus::placeholder {
  color: rgba(255, 103, 103, 0);
}

p {
  padding: 0.5em;
}

.neonButton {
  color: white;
  background-color: black;
  border: 2px solid #0ff;
  margin: 1em;
  width: 10em;
  padding: 0.7em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgb(162, 23, 255),
    0 0 5px rgb(40, 72, 255),
    0 0 20px rgb(40, 72, 255),
    0 0 30px rgb(40, 72, 255);
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
  padding: 0.7em;
  width: 10em;
  margin: 1em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
}

.goPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pagesCounter {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Sixtyfour Convergence;
  font-size: 0.8em;
  text-shadow:
    0 0 0.5px rgb(252, 100, 100),
    0 0 1px rgb(255, 49, 49);
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 2em 0 1em 0;
}

#pages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#moreResults {
  width: fit-content;
  height: 5em;
  ;
  border: 2px solid rgb(255, 0, 0);
  box-shadow:
    0 0 5px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
}

@media (min-width: 1024px) {

  .neonButton {
    cursor: pointer;
  }

  .pagesCounter {
    margin: 0 2em 0 2em;
    padding: 0 4em 0 4em;
    font-size: 1em;
  }

  #goPage {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  #goButton {
    width: fit-content;
  }
}
</style>
