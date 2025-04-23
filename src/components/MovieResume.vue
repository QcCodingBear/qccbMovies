<template>
  <div class="vignetteFilm">
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="imageFilm" id="imageVignette">

    <div id="texteVignette">
      <p>Titre: {{ movie?.title }}</p>
      <p>Date de sortie: {{ movie?.release_date }}</p>
    </div>
  </div>
</template>

<script setup>

defineProps({
  movie: Object
})
</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */

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
</style>
