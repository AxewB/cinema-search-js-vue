<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="bg-transparent" width="1400px">
      <NavigationBar/>
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
                            pa-2"
                      density="compact">
            <VTextField
              class="mr-5 flex-grow-1"
              hide-details
              prepend-icon="mdi-magnify"
              single-line
              label="Search"
              density="compact"
              v-model="filteringSettings.name"
              @update:model-value="resetPage"/>

              <VSelect v-model="filteringSettings.year"
                        class="mr-5"
                        hide-details
                        label="Year"
                        clearable
                        :items="filmStore.filmsYearRange"
                        density="compact"
                        @update:model-value="resetPage"/>
              <VSlider v-model="filteringSettings.length"
                        class="mr-5"
                        hide-details
                        thumb-label
                        label="Length"
                        :min="0"
                        :max="200"
                        :step="1"
                        @update:model-value="resetPage"/>
              <VSlider v-model="filteringSettings.rating"
                        class="mr-5"
                        hide-details
                        thumb-label
                        label="Rating"
                        :min="1"
                        :max="10"
                        :step="1"
                        @update:model-value="resetPage"/>


          <!-- list itself -->
          </v-toolbar>

          <v-toolbar class="mt-2
                            pa-2
                            d-flex
                            flex-row
                            align-center
                            justify-start"
                      rounded
                      density="compact">
            <div class="mr-5 text-body-1" >Сортировать по:</div>
            <div class="mr-5 flex-grow-1 d-flex flex-row justify-start">
              <v-btn class="mr-5 text-body-1"
                      @click="filmStore.sortBy = 'name'"
                      :active="sortBy === 'name'">Имени</v-btn>
              <v-btn class="mr-5 text-body-1"
                      @click="filmStore.sortBy = 'year'"
                      :active="sortBy === 'year'">Году</v-btn>
              <v-btn class="mr-5 text-body-1"
                      @click="filmStore.sortBy = 'movieLength'"
                      :active="sortBy === 'movieLength'">Длительности</v-btn>
              <v-btn class="mr-5 text-body-1"
                      @click="filmStore.sortBy = 'filmCritics'"
                      :active="sortBy === 'filmCritics'">Рейтингу</v-btn>
            </div>
            <div>
              <v-btn-toggle v-model="filmStore.sortDirection"
                          border
                          mandatory
                          class="mr-2">
                <v-btn icon value="ascending">
                  <VTooltip text="Ascending" activator="parent" location="top"/>
                  <VIcon icon="mdi-sort-ascending"/>
                </v-btn>
                <v-btn icon value="descending">
                  <VTooltip text="Descending" activator="parent" location="top"/>
                  <VIcon icon="mdi-sort-descending"/>
                </v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="currentTileSize"
                            mandatory 
                            border>
                <v-btn value="small" icon>
                  <VTooltip text="Small" activator="parent" location="top"/>
                  <VIcon icon="mdi-size-s"/>
                </v-btn>
                <v-btn value="standart" icon>
                  <VTooltip text="Medium" activator="parent" location="top"/>
                  <VIcon icon="mdi-size-m"/>
                </v-btn>
                <v-btn value="large" icon>
                  <VTooltip text="Large" activator="parent" location="top"/>
                  <VIcon icon="mdi-size-l"/>
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-toolbar>
          <v-sheet width="100%"
                  class="d-flex
                          flex-row
                          flex-wrap
                          justify-space-around
                          mt-5">
            <v-hover v-for="film in filmsPageList" :key="film.id + filmStore.sortBy + filmStore.sortDirection"
                    v-slot="{ isHovering, props }"
                    >

              <v-card v-bind="props"
                      :width="tileSize[currentTileSize]"
                      class="mr-2 ml-2 mb-5"
                      :elevation="isHovering ? 10 : 0"
                      @click="moveToFilm(film)"
                      border>
                <v-img :src="film.poster.previewUrl">
                  <v-overlay
                  :model-value="isHovering"
                  contained
                  scrim="#000">
                    <v-sheet class="pa-2 text-justify bg-transparent">
                      {{ film.shortDescription }}
                    </v-sheet>
                  </v-overlay>
                </v-img>
                <v-card-title >{{film.name}}</v-card-title>
                <v-card-text class="text-caption text-disabled d-flex flex-row align-center justify-space-between">
                  {{film.year}} 
                  <v-rating
                    readonly
                    :length="5"
                    :size="24"
                    :model-value="film.rating.kp / 2"
                    active-color="primary"
                  />
                </v-card-text>

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
import { mapStores, mapState } from 'pinia';
import {useFilmStore} from '@/store/filmStore'
import NavigationBar from './NavigationBar.vue';

export default {
  name: 'HomePage',
  components: {
    NavigationBar
  },
  data() {
    return {
      currentFilmPage: 1,
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      tilesOnOnePage: {'small': 24, 'standart': 18, 'large': 15},
    }
  },
  computed: {
    ...mapState(useFilmStore, ['filteringSettings', 'sortBy', 'featuredFilm']),
    ...mapStores(useFilmStore),
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
      return this.filmStore.sortedNFilteredByField
    },
    filmsOnOnePage() {
      const begin = (this.currentFilmPage - 1) * this.tilesOnOnePage[this.currentTileSize];
      const end = this.currentFilmPage * this.tilesOnOnePage[this.currentTileSize];
      return [begin, end]
    },
    pageCount() {
      return Math.ceil(this.filmStore.filmsCount / this.tilesOnOnePage[this.currentTileSize])
    },
  },
  methods: {
    resetPage() {
      this.currentFilmPage = 1
    },
    moveToFilm(film) {
      this.$router.push({
        name: 'film',
        params: { currentFilm: film, id: film.id }
      })
    },
  },
  beforeMount() {
    this.filmStore.filmsLoad();
  },

  watch: {
    currentFilmPage() { 
      const begin = this.filmsOnOnePage[0];
      const end = this.filmsOnOnePage[1];
      this.filmStore.filterRange = [begin, end];
    }    
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
