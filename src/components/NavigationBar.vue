<template>
  <v-sheet class="bg-transparent" width="100%" rounded>
        <v-toolbar rounded
                  class="d-flex bg-transparent">
          <v-sheet class="bg-transparent" width="33%"/>
          <v-sheet class="bg-transparent d-flex justify-center " width="33%">
            <v-btn  :to="{name: 'home'}" 
                     variant="plain">Главная</v-btn>
            <VDivider vertical class="ml-2 mr-2"/>
            <v-btn  :to="{name: 'recommendations'}" 
                     variant="plain">Рекомендации</v-btn>
            <VDivider v-if="this.$route.name === 'home'" 
                      vertical 
                      class="ml-2 mr-2"/>
            <v-btn  v-if="this.$route.name === 'home'" 
                    @click="moveToRandomFilmPage()" 
                     variant="plain" >Случайный фильм</v-btn>
          </v-sheet>
          <v-sheet class="bg-transparent d-flex justify-end" width="33%">
            <v-btn rounded variant="plain" icon="mdi-account" :to="{name: 'favourites'}"/>
          </v-sheet>
        </v-toolbar>
      </v-sheet>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
import { getRandomInt } from '@/scripts/myUtilities'
export default {
  name: "NavigationBar",
  methods: {
    ...mapActions(useFilmStore, ['getRandomFilmId']),
    moveToRandomFilmPage() {
    const filmId = getRandomInt(this.filmsCount)
    this.$router.push({
      name: 'film',
      params: {id: this.films[filmId].id }
    })
  },
  },
  computed: {
    ...mapState(useFilmStore, ['filmsCount', 'films'])
  },
  
}
  
</script>

<style lang="scss" scoped>

</style>