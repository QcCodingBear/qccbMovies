<template>
  <div id="loading">
    <p id="textLoading">x - Chargement - x</p>
  </div>
</template>

<script setup>

</script>

<style scoped>
/*Source style text-shadow:  https://www.youtube.com/watch?v=BDO_xNCw6wU */
/*Source image loading.gif: https://www.reddit.com/r/PixelArt/comments/m1xwcp/back_to_the_future/?rdt=33217 */

#loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-image: url('/src/assets/img/loading.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40em;
  position: relative;
}

#textLoading {
  font-family: "Silkscreen";
  font-size: 2rem;
  color: #ffd8d8;
  margin-top: 0;
  padding-top: 6em;
  text-shadow:
    .1vw 0vw .25vw #ffd8d8, .2vw 0vw .25vw #ffd8d8, .4vw 0vw .25vw #ffd8d8,
    .1vw 0vw 0vw #f25757, .2vw 0vw 0vw #f25757, .4vw 0vw 0vw #f25757,
    .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757, .4vw 0vw .1vw #f25757,
    .1vw 0vw 2vw #f25757, .2vw 0vw 2vw #f25757, .4vw 0vw 2vw #f25757,
    .1vw 0vw 1vw #e50b0b, .2vw 0vw 1vw #e50b0b, .4vw 0vw 5vw #e50b0b,
    .1vw 0vw 5vw #e50b0b, .2vw 0vw 20vw #e50b0b, .4vw 0vw 10vw #e50b0b,
    .1vw 0vw 10vw #e50b0b, .2vw 0vw 30vw #e50b0b, .4vw 0vw 10vw #e50b0b;
}

@media (min-width: 1024px) {

  #loading {
    background-size: 60em;
    background-position: top;
    position: relative;
    padding-top: 5em;
  }

  #textLoading {
    font-family: "Silkscreen";
    font-size: 5rem;
    color: #ffd8d8;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 3em;
  }
}
</style>
