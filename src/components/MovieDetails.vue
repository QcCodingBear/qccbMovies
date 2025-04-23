<template>
  <div>
    <h2>{{ produitClique?.name }}</h2>
<img :src="produitClique?.imageUrl" width="200" style="float:right" />
<h3>{{ produitClique?.description }}</h3>
 <p>Prix: {{produitClique?.price}}</p>
 <p>Prix fixe? {{produitClique?.fixedPrice? 'Oui' : 'Non'}}</p>
 <p>Discontinué? {{produitClique?.discontinued? 'Oui' : 'Non'}}</p>
 <p>Date de modification: {{produitClique?.modifiedDate}}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'QcCB Movies - Details';
});

defineProps({
  filmClique: Object
});

</script>

<style lang="scss" scoped>

</style>
