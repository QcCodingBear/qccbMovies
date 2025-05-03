<template>
  <div id="welcomeContainer">
    <img src="/src/assets/img/popCorn.png" alt="popcorn" class="popCornClap">
    <div id="welcome">
      <p id="textWelcome">Welcome</p>
      <p class="insertCoin">Insert Coin</p>
      <p class="insertCoin">Credit : 0</p>
    </div>
    <img src="/src/assets/img/camera.png" alt="camera" class="popCornClap">
  </div>

</template>

<script setup>
</script>

<style scoped>
/* Source effet neon: https://blog.dorianguilmain.com/comment-creer-un-effet-neon-en-css/#:~:text=La%20propri%C3%A9t%C3%A9%20CSS%20text%2D
    shadow%20ajoute%20des%20ombres%20%C3%A0%20un,offset%20(blur)%20(color)%3B  */
/*Source style text-shadow:  https://www.youtube.com/watch?v=BDO_xNCw6wU */
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */
/*Source image welcomeBackground: https://giphy.com/gifs/southparkgifs-3o6ZsUNRUTKcG9mi8E*/

.popCornClap {
  width: 5rem;
}

.insertCoin {
  font-family: "Doto";
  font-size: 1rem;
  color: #ffd8d8;
  text-shadow:
    .1vw 0vw 0vw #57f25f, .1vw 0vw 0vw #57f25f,
    .2vw 0vw .1vw #57f25f, .2vw 0vw .1vw #57f25f,
    .1vw 0vw 10vw #129c3b, .2vw 0vw 30vw #129c3b;
}

#welcomeContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
}

#welcome {
  display: inline-block;
  width: 90%;
  margin: 1.5rem;
  max-width: 10em;
  text-align: center;
  padding: 0 1em 0 1em;
  background-image: url('/src/assets/img/welcomeBackground.gif');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow:
    0 0 5px rgb(255, 193, 23),
    0 0 30px rgb(255, 193, 23),
    0 0 40px rgb(255, 193, 23);
  border-radius: 25px;
}

#textWelcome {
  margin-bottom: 1rem;
  font-family: "Silkscreen";
  font-size: 2rem;
  color: #ffd8d8;
  text-shadow:
    .1vw 0vw 0vw #e9a4a4, .2vw 0vw 0vw #e9a4a4,
    .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757,
    .1vw 0vw 2vw #f25757, .2vw 0vw 2vw #f25757,
    .4vw 0vw 2vw #f25757, .4vw 0vw 10vw #e50b0b,
    .2vw 0vw 30vw #e50b0b, .4vw 0vw 10vw #e50b0b;
}

@media screen and (min-width: 1024px) {
  .popCornClap {
    width: 10rem;
  }

  #welcome {
    width: auto;
    padding-left: 20rem;
    padding-right: 20rem;
    max-width: 20em;
  }
}
</style>
