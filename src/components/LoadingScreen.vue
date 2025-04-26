<template>
    <div id="loading">
      <p id="textLoading">x - Chargement - x</p>
    </div>
</template>

<script setup>

</script>

<style scoped>

#loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-image: url('/src/assets/img/loading.gif');
  /*https://www.reddit.com/r/PixelArt/comments/m1xwcp/back_to_the_future/?rdt=33217 */
  background-repeat: no-repeat;
  background-position: top;
  background-size: 60em;
  position: relative;
  padding-top: 100px;
}

#textLoading {
  font-family: "Silkscreen";
  font-size: 5rem;
  color: #ffd8d8;
  margin-top: 0;
  padding-bottom: 3em;
  text-shadow:
    /* https://www.youtube.com/watch?v=BDO_xNCw6wU */
    .1vw 0vw .25vw #ffd8d8, .2vw 0vw .25vw #ffd8d8, .4vw 0vw .25vw #ffd8d8,

    .1vw 0vw 0vw #f25757, .2vw 0vw 0vw #f25757, .4vw 0vw 0vw #f25757,
    .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757, .4vw 0vw .1vw #f25757,
    .1vw 0vw 2vw #f25757, .2vw 0vw 2vw #f25757, .4vw 0vw 2vw #f25757,

    .1vw 0vw 1vw #e50b0b, .2vw 0vw 1vw #e50b0b, .4vw 0vw 5vw #e50b0b,
    .1vw 0vw 5vw #e50b0b, .2vw 0vw 20vw #e50b0b, .4vw 0vw 10vw #e50b0b,
    .1vw 0vw 10vw #e50b0b, .2vw 0vw 30vw #e50b0b, .4vw 0vw 10vw #e50b0b;
}
</style>
