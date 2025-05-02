<script setup>
import MovieSearch from './components/MovieSearch.vue';
import MainFooter from './components/MainFooter.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <a href="/"><img src="/src/assets/img/banniere.png" alt="Banniere" id="banniere"></a>
    <nav>
      <MovieSearch />
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <MainFooter />
  </footer>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;
}

nav {
  width: 100%;
  margin: 2em;
}

main {
  max-height: fit-content;
}

#banniere {
  max-width: 100%;
}

@media (min-width: 1024px) {

  nav {
    font-size: 1.5em;
    max-height: 5em;
    margin: 0;
  }
  header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 3em;
}
#banniere {
  max-width: 100%;
}
}
</style>
