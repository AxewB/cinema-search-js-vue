<template>
  <v-sheet  class="bg-transparent d-flex" 
            width="100%" 
            rounded>
    <v-toolbar  class="d-flex 
                      bg-transparent 
                      pl-2 
                      pr-2"
                rounded
                width="100%">
      <v-sheet  class="flex-grow-1 
                      d-flex 
                      bg-transparent 
                      justify-center 
                      align-center" 
                width="100%">
        <v-sheet class="bg-transparent" width="30%">
          <slot name="start"></slot>
        </v-sheet>
        <v-sheet  class="bg-transparent 
                        d-flex 
                        justify-center" 
                  width="40%">
          <v-btn variant="plain" :to="{name: 'home'}" >
            Главная
          </v-btn>
          <VDivider v-if="this.$route.name === 'home'" 
                    vertical 
                    class="ml-2 mr-2"/>
          <v-btn variant="plain" @click="moveToRandomFilmPage()">
            Случайный фильм
          </v-btn>
        </v-sheet>
        <v-sheet  class="bg-transparent 
                        d-flex 
                        justify-end" 
                  width="30%">
          <v-btn  rounded 
                  variant="tonal" 
                  icon="mdi-bookmark" 
                  :to="{name: 'favourites'}"/>
        </v-sheet>
      </v-sheet>
    </v-toolbar>
  </v-sheet>
</template>

<script>
import { mapState } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
import getRandomInt from '@/scripts/getRandomInt.js'
export default {
  name: "NavigationBar",
  methods: {
    /**
     * Переход на страницу случайного фильма (что-то по типу "мне повезет")
     */
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