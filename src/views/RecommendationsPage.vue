<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="bg-transparent" width="1400px">
      <NavigationBar/>
    </v-sheet>
  </v-sheet>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'RecommendationsPage',
  components: {
    NavigationBar
  }
}
</script>
