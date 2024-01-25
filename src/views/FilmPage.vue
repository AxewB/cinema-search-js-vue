<template>
  <v-sheet class="bg-transparent 
                  d-flex 
                  justify-center 
                  pa-2" 
            width="100%">
    <v-sheet class="bg-transparent" width="1200px" rounded >
      <NavigationBar/>

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
            <v-sheet class="bg-transparent flex-grow-1">
            </v-sheet>  
            
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
              
              <VDivider class="ma-2"/>
              <VBtn  v-if="!userStore.isExists(filmId)" 
                      width="100%" 
                      @click="addFilmToUserList()" text="Add to list"/>
              <v-sheet v-else class="d-flex flex-column bg-transparent">
                <v-sheet class="d-flex flex-row bg-transparent">
                  <VSelect  width="100%" 
                            :items="userStore.lists" 
                            v-model="userStore.films[filmId].status" 
                            hide-details
                            class="flex-grow-1 mr-2 text-capitalize"
                            density="comfortable"
                            variant="solo"/>
                  
                  
                </v-sheet>
                <v-sheet width="100%" class="bg-transparent mt-2 d-flex">
                  <v-btn icon
                        rounded
                        variant="tonal"
                        @click="addFilmToFavourites()"
                        :color="isInFavourites ? 'primary' : ''"
                        class="mr-2 flex-grow-1">
                    <VTooltip text="Add to favourites" activator="parent" location="top"></VTooltip>
                    <VIcon icon="mdi-heart" />
                  </v-btn>
                  <v-btn icon rounded @click="removeFilmFromList()" variant="tonal" class="mr-2" color="error">
                    <VTooltip text="Remove" activator="parent" location="top"></VTooltip>
                    <VIcon icon="mdi-delete"></VIcon>
                  </v-btn>  
                </v-sheet>
                <v-sheet class="d-flex flex-row bg-transparent justify-center" width="100%">
                  <VRating
                    v-model="userStore.films[this.$route.params.id].rating"
                    hover
                    half-increments/>
                </v-sheet>
              </v-sheet>
              
              <VDivider class="ma-2"/>
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
              
              <VDivider class="ma-2"/>
              <filmInfoBar v-if="film.year" :title="'Year'" :data="film.year.toString()"/>
              <filmInfoBar v-if="film.alternativeName" :title="'Alternative name'" :data="film.alternativeName"/>
              <filmInfoBar v-if="film.movieLength" :title="'Length'" :data="film.movieLength.toString()"/>
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
import NavigationBar from '@/components/NavigationBar.vue';
export default {
  name: "FilmPage", 
  components: {
    filmInfoBar,
    NavigationBar
  },
  methods: {
    addFilmToFavourites() {
      this.userStore.toggleFilmFavourite(this.filmId, this.film) 
    },
    addFilmToUserList() {
      this.userStore.addFilmToProfile(this.filmId, this.film)
    },
    removeFilmFromList() {
      this.userStore.removeFilmFromProfile(this.filmId)
    }
  },
  computed: {
    ...mapStores(useFilmStore, useUserStore),
    filmId() {
      return this.$route.params.id
    },
    film() {
      return this.filmStore.films.find(film => film.id == this.filmId)
    },
    isInFavourites() {
      return this.userStore.isInFavourites(this.filmId)
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
