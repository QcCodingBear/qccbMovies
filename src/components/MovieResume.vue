<template>
  <div class="movieCard">
    <img :src="imageOrNull(movie.poster_path)" alt="imageFilm" id="imageCard" @click="showDetails()">

    <div class="textArea" >
      <p @click="showDetails()" id="clickableTitle"><span id="titleAndDate">Titre</span>{{ movie.title }}</p>
      <p><span id="titleAndDate">Date de sortie</span>{{ movie.release_date }}</p>
    </div>
    <div id="details">
      <p @click="showDetails()">Détails</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores';

const router = useRouter();
const movieStore = useMovieStore();

const props = defineProps({
  movie: Object
})

function imageOrNull(imagePath) {
  const chemin = imagePath ? 'https://image.tmdb.org/t/p/w500' + imagePath : '../src/assets/img/noImage.png';
  return chemin
}

// Source window.scroll : https://developer.mozilla.org/fr/docs/Web/API/Window/scrollBy
async function showDetails() {
  await movieStore.getMovieByID(props.movie.id);
  router.push({ name: 'detailsMovie' });
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */

.movieCard {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.6em;
  margin-bottom: 1em;
  box-shadow:
    0 0 5px rgb(162, 23, 255),
    0 0 10px rgb(162, 23, 255),
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
  border-radius: 10px;
  background-image: url(/src/assets/img/pixel.png);
  background-repeat: repeat;
}

.textArea {
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  font-family: "Silkscreen";
  color: blanchedalmond;
  font-size: 1.2em;
  text-shadow:
    0 0 0.5px rgb(252, 100, 100),
    0 0 1px rgb(255, 49, 49),
    8px 8px 5px rgb(0, 0, 0),
    8px 8px 10px rgb(0, 0, 0);
}

#imageCard {
  max-height: 12em;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  box-shadow: 8px 8px 5px rgb(0, 0, 0),
  8px 8px 10px rgb(0, 0, 0);
}

#imageCard:hover {
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgb(255, 255, 255);
}

#titleAndDate {
  display: flex;
  flex-direction: column;
  font-family: Sixtyfour Convergence;
  font-size: 0.6em;
  padding: 0.5em;
}

#details {
  display: none;
}

#details:hover, #clickableTitle:hover {
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow:
    0 0 10px rgb(255, 255, 255),
    0 0 20px rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}

@media screen and (min-width: 1024px) {

.movieCard {
  margin: 1.5em 8em 1.5em 8em;
}

#details {
  display: block;
  align-self: flex-start;
  font-family: "Silkscreen";
  font-size: 1.4em;
  margin-right: 0.5em;
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.295),
    8px 8px 5px rgb(0, 0, 0),
    8px 8px 10px rgb(0, 0, 0);
  color: rgb(123, 131, 177);
}

#titleAndDate {
  font-size: 0.8em;
}

.textArea {
  font-size: 1.4em;
}

#imageCard {
  max-height: 14em;
  margin: 0.2em 1em 0.2em 1em;
}

}
</style>
