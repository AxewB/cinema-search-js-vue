<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="bg-transparent" max-width="1400px">
    
      <!-- top bar -->
      <v-sheet class="background-transparent">
      <v-toolbar rounded 
                 elevation="10" 
                 class="d-flex">
        <v-sheet class="bg-transparent" width="33%"/>
        <v-sheet class="bg-transparent d-flex justify-center" width="33%">
          <v-btn>Home</v-btn>
          <v-btn>Recommendations</v-btn>

          <!-- todo: just sending to a random film page -->
          <v-btn>Feeling lucky</v-btn>
        </v-sheet>
        <v-sheet class="bg-transparent d-flex justify-end" width="33%">
          <v-btn icon="mdi-heart"/>
        </v-sheet>
      </v-toolbar>
    </v-sheet>

    <!-- featured film -->
    <v-img class="ma-5 d-flex rounded-lg " 
            v-bind=props
            :src="featuredFilmPoster"
            cover 
            height="500px">
      <div class="bg-blur featured-film-overlay pa-5 rounded-lg d-flex flex-row">
        
          <v-sheet  class="bg-transparent">
            <div class="text-h4 text-disabled">Featured Film</div>
            <VDivider class="mb-3"/>
            <div class="text-h2 mb-5">{{ featuredFilmName }}</div>
            <div class="text-body-1 text-disabled" 
                height="100%">
            {{ featuredFilmDescription }}
           
            </div>
            <v-btn class="mt-5" variant="outlined" size="large">WATCH NOW</v-btn>
          </v-sheet>
       <v-img class="rounded-lg ma-2"
            :src="featuredFilmPoster"
            cover
            width="300px">          
        </v-img>
      </div> 
    </v-img>

    <!-- films list -->
    <v-sheet class="bg-transparent d-flex flex-row pa-5 pt-0" width="100%">
      <v-sheet class="flex-grow-1 pa-2" rounded>

        <!-- filters -->
        <v-toolbar rounded 
                    class="d-flex 
                           flex-row 
                           justify-space-around
                           align-center
                           pa-2">
          <VTextField
            class="mr-5 flex-grow-1"
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            label="Search"
            v-model="searchData.name" />
          
            <VSelect v-model="searchData.year" class="mr-5" hide-details label="Year" clearable/>
            <VSlider v-model="searchData.length" 
                      class="mr-5" 
                      hide-details 
                      thumb-label
                      label="Length" 
                      :min="0"
                      :max="200"
                      :step="1"/>
            <VSlider v-model="searchData.rating" 
                      class="mr-5" 
                      hide-details 
                      thumb-label
                      label="Rating" 
                      :min="1" 
                      :max="5" 
                      :step="1"/>
        
        <v-btn-toggle v-model="currentTileSize">
          <v-btn value="small">Small</v-btn>
          <v-btn value="standart">Medium</v-btn>
          <v-btn value="large">Large</v-btn>
        </v-btn-toggle>

        <!-- list itself -->
        </v-toolbar>
        <v-sheet width="100%" 
                 class="d-flex 
                        flex-row 
                        flex-wrap 
                        justify-space-around 
                        mt-5">
          <v-hover v-for="film in filmsPageList" :key="film.id"
                   v-slot="{ isHovering, props }"> 

            <v-card v-bind="props"
                    :width="tileSize[currentTileSize]" 
                    class="mr-2 ml-2 mb-5"
                    :elevation="isHovering ? 10 : 0">
              <v-img :src="film.poster.previewUrl">
                <v-overlay
                class="pa-2"
                :model-value="isHovering"
                contained
                scrim="#000"
                >
                  {{ film.shortDescription }}                
                </v-overlay>
              </v-img>
              <v-card-title >{{film.name}}</v-card-title>
              <v-card-text class="text-caption text-disabled">{{film.year}}</v-card-text>
              
            </v-card>
          </v-hover>
          
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-pagination :length="pageCount" v-model="currentFilmPage"></v-pagination>
  </v-sheet>
  </v-sheet>
  
 
</template>

<script>
import { mapStores } from 'pinia';
import {useFilmStore} from '@/store/filmStore'

export default {
  name: 'HomePage',
  data() {
    return {
      currentFilmPage: 1,
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      tilesOnOnePage: {'small': 24, 'standart': 18, 'large': 15},
      searchData: {year: 0, rating: 0, name: '', length: 0},
    }
  },
  computed: {
    ...mapStores(useFilmStore),
    featuredFilm() {
      return this.filmStore.featuredFilm;
    },
    featuredFilmPoster () {
      return this.featuredFilm.poster.url;
    },
    featuredFilmName() {
      return this.featuredFilm.name;
    },
    featuredFilmDescription() {
      return this.featuredFilm.description;
    },
    filmsPageList() {
      const begin = (this.currentFilmPage - 1) * this.tilesOnOnePage[this.currentTileSize];
      const end = this.currentFilmPage * this.tilesOnOnePage[this.currentTileSize];
      return this.filmStore.filmsFromRange(begin, end)
    },
    pageCount() {
      return Math.ceil(this.filmStore.filmsCount / this.tilesOnOnePage[this.currentTileSize]) 
    },

  },
  beforeMount() {
    this.filmStore.filmsLoad();
  }
}
</script>

<style lang="scss">
.featured-film-overlay {
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(255,0,0,0) 100%);
  height: 100%;
}

.bg-blur {
  backdrop-filter: blur(10px);
}
</style>