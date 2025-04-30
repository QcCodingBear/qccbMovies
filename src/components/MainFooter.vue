<template>
  <div id="footer">
    <p id="up" @click="goUp()">Remonter la page</p>
    <p>Copyright 2025</p>
    <p>420-FAG-LI</p>
    <p>TP3</p>
    <p>Thierry Matteucci</p>
    <img src="/src/assets/img/banniere.png" alt="banniere">
  </div>
</template>

<script setup>
function goUp()
{
  window.scroll({
    top: 0,
    behavior: "smooth",});
    }
</script>

<style scoped>
#footer {
  position: relative;
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
  text-align: center;
  color: blanchedalmond;
  border-radius: 2em;
  border:  solid 1px rgb(255, 255, 255);
  box-shadow: 0 0 0.5em rgb(255, 255, 255);
}

/* Rendre l'image de background transparente:
https://www.digitalocean.com/community/tutorials/how-to-change-a-css-background-images-opacity */
#footer::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/img/pixel.png);
  background-size: repeat;
  opacity: 0.5;
  z-index: -1;
}

p{
  font-family:Doto;
  font-weight: bold;
  text-decoration: none;
  font-size: 1em;
  text-shadow:
    0 0 5px rgba(64, 197, 157, 0.295),
    8px 8px 5px rgb(0, 0, 0),
    8px 8px 10px rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}

#up:hover {
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow:
    0 0 10px rgb(255, 255, 255),
    0 0 20px rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}

img {
  max-width: 50%;
  justify-self: center;
  margin-bottom: 1em;
}

</style>
