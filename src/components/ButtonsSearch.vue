<template>
  <div class="buttons"
    v-if="useMovieStore.pageActuelle === useMovieStore.totalPages && useMovieStore.seeMore < 450 && useMovieStore.heavySearch">
    <button @click="voirPlus('precedent')" class='neonButton' id="moreResults">Afficher plus de Résultats</button>
  </div>

  <div class="buttons">
    <button :disabled="useMovieStore.pageActuelle <= 1" @click="changerPage('precedent')"
      :class="useMovieStore.pageActuelle <= 1 ? 'neonButtonDisabled' : 'neonButton'">Precedent</button>

      <div id="pagesCounter">
    <p>Page</p>
    <input type="text" v-model="goPage" :placeholder="useMovieStore.pageActuelle">
    <p id="maxCounter">/{{ useMovieStore.totalPages }}</p>
  </div>

    <button :disabled="useMovieStore.pageActuelle >= useMovieStore.totalPages" @click="changerPage('suivant')"
      :class="useMovieStore.pageActuelle >= useMovieStore.totalPages ? 'neonButtonDisabled' : 'neonButton'">Suivant</button>
  </div>

  <form action="post" v-if="useMovieStore.totalPages > 0" class="goPage" @submit.prevent="goChangePage()">
    <button type="submit" :class="goPage > useMovieStore.totalPages || goPage <= 0 || isNaN(goPage) ? 'neonButtonDisabled' : 'neonButton'" id="goButton">Aller à la page</button>
  </form>

</template>

<script setup>
import { movieStore } from "../stores";
import { ref } from "vue";

const useMovieStore = movieStore();
const goPage = ref("");

// Source window.scroll : https://developer.mozilla.org/fr/docs/Web/API/Window/scroll
async function changerPage(operation) {

  useMovieStore.pageActuelle = operation === 'precedent' ? useMovieStore.pageActuelle - 1 : useMovieStore.pageActuelle + 1;

  if (!useMovieStore.heavySearch) {
    await useMovieStore.definirListeSearch();
  }

  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

async function voirPlus() {
  useMovieStore.seeMore += 50;
  await useMovieStore.definirListeSearch();
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth"});
}

async function goChangePage() {
  if (goPage.value <= useMovieStore.totalPages && goPage.value >= 1 && !isNaN(goPage.value))
{
  useMovieStore.pageActuelle = parseInt(goPage.value);
  if (!useMovieStore.heavySearch) {
   await useMovieStore.definirListeSearch();
  }
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
  margin: 1em;
  width: 10em;
  padding: 0.7em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
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
  padding: 0.7em;
  width: 10em;
  margin: 1em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
}

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
p {
  padding: 0.5em;
}


input::placeholder {
  color: rgb(255, 103, 103);
  font-weight: bold;
}

/* https://stackoverflow.com/questions/13183421/how-to-change-placeholder-color-on-focus */
input:focus::placeholder {
  color: rgba(255, 103, 103, 0);
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
  font-family: Sixtyfour Convergence;
  font-size: 0.8em;
  text-shadow:
  0 0 0.5px rgb(252, 100, 100),
  0 0 1px rgb(255, 49, 49);
}

.goPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 2em 0 1em 0;
}

#moreResults {
  width: fit-content;
  height: 5em;;
  border: 2px solid rgb(255, 0, 0);
  box-shadow:
    0 0 5px rgb(162, 23, 255),
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
}

@media (min-width: 1024px) {
  #goPage {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#goButton {
  width: fit-content;
  margin-right: 2em;
}

.neonButton {
  cursor: pointer;
}

#pagesCounter {
  margin: 0 2em 0 2em;
  padding: 0 4em 0 4em;
  font-size: 1em;
}
}
</style>
