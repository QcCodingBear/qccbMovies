<template>
  <div id="noResult">
    <img src="/src/assets/img/noResult.png" alt="noResult">
    <p id="gameOver">Game Over</p>
    <p id="message">Essaie une nouvelle recherche<br> avec d'autres critéres.</p>
  </div>
</template>

<script setup>

</script>

<style  scoped>

#noResult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
  font-family: Sixtyfour Convergence;
  text-shadow:
  0 0 0.5px rgb(252, 100, 100),
  0 0 1px rgb(255, 49, 49);
}

#gameOver {
  margin: 1em 3em 0 3em;
  font-size: 1em;
  text-shadow:
  0 0 0.5px rgb(252, 100, 100),
  0 0 1px rgb(255, 49, 49);
}

#message {
  background-image: url(/src/assets/img/welcomeBackground.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: solid 2px rgb(195, 0, 255);
  box-shadow: 0 0 10px  rgb(195, 0, 255);
  text-align: center;
  padding: 2em;
  border-radius: 10px;
}

img {
  max-width: 8em;
  box-shadow:
    0 0 5px rgb(255, 50, 23),
    0 0 10px rgb(255, 50, 23),
    0 0 20px rgb(255, 50, 23),
    0 0 30px rgb(255, 50, 23),
    0 0 40px rgb(255, 50, 23);
}

@media (min-width: 1024px) {
  img {
    max-width: 20em;
  }

  #noResult{
    margin: 2em;
  }
  #gameOver {
  margin: 1em 3em 0 3em;
  font-size: 2em;
}
}
</style>
