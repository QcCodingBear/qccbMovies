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
/* Source animation boutton: https://dev.to/webdeasy/top-20-css-buttons-animations-f41 */

#welcomeContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

#welcome {
  display: inline-block;
  margin: 1.5rem;
  text-align: center;
  padding-left: 20rem;
  padding-right: 20rem;
  background-image: url('/src/assets/img/welcomeBackground.webp'); /*https://giphy.com/gifs/southparkgifs-3o6ZsUNRUTKcG9mi8E*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow:
    0 0 5px rgb(255, 193, 23),
    0 0 10px rgb(255, 193, 23),
    0 0 20px rgb(255, 193, 23),
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
    .1vw 0vw 0vw #ffd8d8, .2vw 0vw 0vw #ffd8d8, .2vw 0vw 0vw #ffd8d8,
    .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757,
    .1vw 0vw .1vw #f25757, .2vw 0vw .1vw #f25757, .4vw 0vw .1vw #f25757,
    .1vw 0vw 2vw #f25757, .2vw 0vw 2vw #f25757, .4vw 0vw 2vw #f25757,
    .1vw 0vw 1vw #e50b0b, .2vw 0vw 1vw #e50b0b, .4vw 0vw 5vw #e50b0b,
    .1vw 0vw 5vw #e50b0b, .2vw 0vw 20vw #e50b0b, .4vw 0vw 10vw #e50b0b,
    .1vw 0vw 10vw #e50b0b, .2vw 0vw 30vw #e50b0b, .4vw 0vw 10vw #e50b0b;
}

.popCornClap {
  width: 10rem;
}

.insertCoin {
  font-family: "Doto";
  font-size: 1rem;
  color: #ffd8d8;
  text-shadow:
    .1vw 0vw 0vw #57f25f, .2vw 0vw 0vw #57f25f, .2vw 0vw 0vw #57f25f,
    .1vw 0vw .1vw #57f25f, .2vw 0vw .1vw #57f25f, .2vw 0vw .1vw #57f25f,
    .1vw 0vw .1vw #57f25f, .2vw 0vw .1vw #57f25f, .4vw 0vw .1vw #57f25f,
    .1vw 0vw 2vw #57f25f, .2vw 0vw 2vw #57f25f, .4vw 0vw 2vw #57f25f,
    .1vw 0vw 1vw #129c3b, .2vw 0vw 1vw #129c3b, .4vw 0vw 5vw #129c3b,
    .1vw 0vw 5vw #129c3b, .2vw 0vw 20vw #129c3b, .4vw 0vw 10vw #129c3b,
    .1vw 0vw 10vw #129c3b, .2vw 0vw 30vw #129c3b, .4vw 0vw 10vw #129c3b;
}
</style>
