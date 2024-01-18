<template>
  <v-sheet class="bg-transparent 
                  d-flex 
                  justify-center 
                  pa-2" 
            width="100%">
    <v-sheet class="bg-transparent" width="1200px" rounded >
      <VImg :src="film.poster.url" 
            height="100vh" 
            cover 
            class="rounded-lg">
        <v-sheet class="background-overlay" max-width="1200px">
          <v-sheet class="bg-transparent pa-5 d-flex justify-space-between" 
                  height="15%">
            <v-btn prepend-icon="mdi-arrow-left" 
                   variant="tonal"
                   @click="$router.go(-1)">
              Back
            </v-btn>
            <v-btn icon
                   rounded="lg"
                   @click="addFilmToFavourites()"
                   :color="isInFavourites ? 'deep-purple-darken-1' : ''">
              <VIcon icon="mdi-heart" />
            </v-btn>
          </v-sheet>
          <v-sheet class="bg-transparent 
                          d-flex 
                          flex-row 
                          justify-start 
                          pa-5" 
                    height="45%" 
                    rounded >
            <v-sheet class=" mr-5 bg-transparent">
              <VImg class="rounded-lg elevation-10" 
                    :src="film.poster.url" 
                    cover 
                    width="270px"/>
              
              <VDivider class="ma-5"/>
              <v-list rounded >
                <v-list-subheader>WHERE TO WATCH</v-list-subheader>
                <v-list max-height="250px" class="overflow-auto">
                  <v-list-item v-for="cinema in film.watchability.items" :key="cinema._id" :href="cinema.url" class="mb-2 d-flex align-center" size="x-large" icon>
                    <VAvatar :image="cinema.logo.url" size="30" class="mr-2"/>
                    {{ cinema.name }}
                  </v-list-item>
                </v-list>
                
              </v-list>
              
              
            </v-sheet>
            <v-sheet class="d-flex flex-column bg-transparent" width="100%" >
              <v-sheet class="text-h2 
                              bg-transparent 
                              mt-10 
                              d-flex
                              align-center" width="100%" >
                <v-sheet class="flex-grow-1 bg-transparent">
                  {{  film.name }}
                </v-sheet>
                <v-sheet class="rounded-lg pa-2 text-h3 elevation-10">
                  {{ film.rating.kp.toFixed(1) }}
                </v-sheet>
              </v-sheet>
              <v-sheet class="text-body-1 bg-transparent pa-2 mt-10" width="100%" >
                {{ film.description }}
              </v-sheet>
              <VDivider class="ma-5"/>
              <filmInfoBar v-if="film.year" :title="'Year'" :data="film.year"/>
              <filmInfoBar v-if="film.alternativeName" :title="'Alternative name'" :data="film.alternativeName"/>
              <filmInfoBar v-if="film.movieLength" :title="'Length'" :data="film.movieLength"/>
              <filmInfoBar v-if="film.type" :title="'Type'" :data="film.type"/>
              <filmInfoBar v-if="otherNames" :title="'Other names'" :data="otherNames"/>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </VImg>  
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapStores } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
import { useUserStore } from '@/store/userStore';
import filmInfoBar from '@/components/filmInfoBar.vue'
export default {
  name: "FilmPage", 
  components: {
    filmInfoBar
  },
  methods: {
    addFilmToFavourites() {
      this.userStore.toggleFilmInFavourites(this.$route.params.id) 
    }
  },
  computed: {
    ...mapStores(useFilmStore, useUserStore),
    film() {
      return this.filmStore.films.find(film => film.id == this.$route.params.id)
    },
    isInFavourites() {
      return this.userStore.isExists(this.$route.params.id)
    },
    otherNames() {
      let names = '';
      for (let i = 0; i < this.film.names.length; i++) {
        if (!i) 
          names = this.film.names[i].name
        else {
          names += ', ' + this.film.names[i].name
        }
      }
      return names
    }
  }
}
</script>

<style scoped>
.background-overlay {
  width: 100%;
  height: 100%;
  background: rgb(28,27,34);
  background: linear-gradient(0deg, rgba(28,27,34,1) 70%, rgba(28,27,34,0) 100%);
  backdrop-filter: blur(10px);
}
</style>
