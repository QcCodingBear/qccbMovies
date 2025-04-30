<template>

  <MovieDetails v-if="movie" :movie='movie'/>

  <div id="buttons">
    <button @click="changerPage()" class='neonButton'>Retour</button>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import MovieDetails from '../components/MovieDetails.vue';
import { onMounted, ref } from 'vue';
import { movieStore } from '../stores';

const useMovieStore = movieStore();
const router = useRouter();
const movie = ref();

onMounted(() => {
  document.title = 'QcCB Movies - Details';
  movie.value = useMovieStore.movieClicked;
});

function changerPage() {
  router.back();
}

defineProps({
  movies: Array
})

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
