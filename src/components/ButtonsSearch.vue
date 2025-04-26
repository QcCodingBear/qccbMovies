<template>
  <div class="buttons"
    v-if="useMovieStore.pageActuelle === useMovieStore.totalPages && useMovieStore.seeMore < 450 && useMovieStore.heavySearch">
    <button @click="voirPlus('precedent')" class='neonButton' id="moreResults">Plus de Résultats</button>
  </div>

  <div class="buttons">
    <button :disabled="useMovieStore.pageActuelle <= 1" @click="changerPage('precedent')"
      :class="useMovieStore.pageActuelle <= 1 ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>

      <div id="pagesCounter">
    Page {{ useMovieStore.pageActuelle }} / {{ useMovieStore.totalPages }}
  </div>

    <button :disabled="useMovieStore.pageActuelle >= useMovieStore.totalPages" @click="changerPage('suivant')"
      :class="useMovieStore.pageActuelle >= useMovieStore.totalPages ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>

  <form action="post" v-if="useMovieStore.totalPages > 0" id="goPage" @submit.prevent="goChangePage()">
    <input type="text" v-model="goPage" placeholder="Aller à la page">

    <button type="submit" :class="goPage > useMovieStore.totalPages || goPage <= 0 || isNaN(goPage) ? 'neonButtonDisabled' : 'neonButton'" id="goButton">Go</button>
  </form>

</template>

<script setup>
import { movieStore } from "../stores";
import { ref } from "vue";

const useMovieStore = movieStore();
const goPage = ref("");

// Source window.scroll : https://developer.mozilla.org/fr/docs/Web/API/Window/scrollBy
function changerPage(operation) {

  useMovieStore.pageActuelle = operation === 'precedent' ? useMovieStore.pageActuelle - 1 : useMovieStore.pageActuelle + 1;

  if (!useMovieStore.heavySearch) {
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

function goChangePage() {
  if (goPage.value <= useMovieStore.totalPages && goPage.value >= 1 && !isNaN(goPage.value))
{
  useMovieStore.pageActuelle = goPage.value;
  useMovieStore.definirListeSearch();
  window.scroll({
    top: 0,
    behavior: "smooth",});
}

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
  padding: 10px;
  width: 150px;
  margin: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}

input {
  color: white;
  font-size: 16px;
  background-image: url('/src/assets/img/welcomeBackground.webp'); /*https://giphy.com/gifs/southparkgifs-3o6ZsUNRUTKcG9mi8E*/
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 1em 0 1em 0;
  box-shadow:
  0 0 2px rgb(255, 255, 255),
  0 0 2px rgb(244, 255, 205),
    0 0 5px rgb(255, 223, 63),
    0 0 10px rgb(255, 223, 63),
    0 0 10px rgb(255, 193, 23);
  border-radius: 25px;
  max-width: 8em;
}

#pages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#pagesCounter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3em 0 3em;
  font-family: Sixtyfour Convergence;
  text-shadow:
  0 0 0.5px rgb(252, 100, 100),
  0 0 1px rgb(255, 49, 49);
}

#goButton {
  width: fit-content;
  margin-left: 1.5em;
}

#goPage {
  display: flex;
  flex-direction: inline;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 2em 0 1em 0;
}

#moreResults {
  width: fit-content;
  border: 2px solid rgb(255, 0, 0);
  box-shadow:
    0 0 5px rgb(162, 23, 255),
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
}
</style>
