<template>
  <div class="detailsContainer">
    <img src="/src/assets/img/filmStrip.png" alt="filmStrip" class="strip">
    <h2>{{ movie.title }}</h2>
    <img :src="imageOrNull(movie.poster_path)" alt="poster">
    <h3>Description</h3>
    <p>{{movie.overview}}</p>
    <h3>Note</h3>
    <p>{{movie.vote_average}} / 10</p>
    <h3>Durée</h3>
    <p>{{movieStore.runtimeHours}}</p>
    <h3>Année de sortie</h3>
    <p>{{ dateToYear(movie.release_date) }}</p>
    <img :src="imageOrNull(movie.backdrop_path)" alt="backdrop">
    <!--Source ouvrir dans un nouvel onglet: https://www.ionos.fr/digitalguide/sites-internet/developpement-web/html-target/ -->
    <p><a :href="'https://www.themoviedb.org/movie/' + movie.id" target="_blank" rel="noopener" id="url">Voir la page TMDB</a></p>
    <img src="/src/assets/img/filmStrip.png" alt="filmStrip" class="strip">
  </div>
</template>

<script setup>
import { useMovieStore } from '../stores';

const movieStore = useMovieStore();

// Attribue l'image associée dans l'API, ou l'image par défaut
function imageOrNull(imagePath) {
  if(!imagePath) return '/src/assets/img/noImageFound.png';
  return 'https://image.tmdb.org/t/p/w500' + imagePath;
}

// Pour ne garder que l'année de sortie.
function dateToYear(date) {
  return date.slice(0, 4);
}

defineProps({
  movie: Object,
});

</script>

<style scoped>

h2, h3 {
  margin: 2em 2em 1.2em 2em;
  font-family: Sixtyfour Convergence;
  text-shadow:
    0 0 0.5px rgb(252, 100, 100),
    0 0 1px rgb(255, 49, 49),
    8px 8px 5px rgb(0, 0, 0),
    8px 8px 10px rgb(0, 0, 0);
}

img {
  box-shadow: 1em 1em 5px rgb(0, 0, 0),
  8px 8px 10px rgb(0, 0, 0);
  margin: 1em 0 1em 0;
  width: 85vw;
  max-width: 35em;
}

p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2em;
  color: blanchedalmond;
  margin: 0 2em 0 2em;
}

.detailsContainer {
  display: flex;
  flex-direction:column;
  align-items: center;
  text-align: center;
  margin: 0;
  box-shadow:
    0 0 20px rgb(162, 23, 255),
    0 0 30px rgb(162, 23, 255),
    0 0 40px rgb(162, 23, 255);
  border-radius: 10px;
  background-image: url(/src/assets/img/pixel.png);
  background-repeat: repeat;
}

.strip {
  box-shadow: none;
  width: 25em;
}


#url {
  font-family:Doto;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.3em;
  text-shadow:
    0 0 5px rgba(64, 197, 157, 0.295),
    8px 8px 5px rgb(0, 0, 0),
    8px 8px 10px rgb(0, 0, 0);
  color: rgb(143, 212, 129);
}

#url:hover {
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow:
    0 0 10px rgb(255, 255, 255),
    0 0 20px rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}


@media (min-width: 1024px) {
  .detailsContainer {
  margin: 1.5em 5em 1.5em 5em;
}
}
</style>
