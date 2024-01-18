<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue';  
import { useFilmStore } from './store/filmStore';
const filmStore = useFilmStore()
onBeforeMount(() => {
  filmStore.filmsLoad();
})
</script>
