<template>
  <v-sheet class="background-transparent" width="100%">
        <v-toolbar rounded
                  elevation="10"
                  class="d-flex bg-transparent">
          <v-sheet class="bg-transparent" width="33%"/>
          <v-sheet class="bg-transparent d-flex justify-center" width="33%">
            <router-link :to="{name: 'home'}">
              <v-btn exact>Home</v-btn>
            </router-link>
            <router-link :to="{name: 'recommendations'}">
              <v-btn exact>Recommendations</v-btn>
            </router-link>
            <router-link>
              <v-btn>Feeling lucky</v-btn>
            </router-link>
          </v-sheet>
          <v-sheet class="bg-transparent d-flex justify-end" width="33%">
            <router-link :to="{name: 'favourites'}" exact>
              <v-btn icon="mdi-heart" />
            </router-link>
          </v-sheet>
        </v-toolbar>
      </v-sheet>
</template>

<script>
import { mapActions } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
export default {
  name: "NavigationBar",
  methods: {
    ...mapActions(useFilmStore, ['getRandomFilmId'])
  }
}
  
</script>

<style lang="scss" scoped>

</style>