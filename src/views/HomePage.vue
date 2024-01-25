<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="bg-transparent" width="1200px">
      <NavigationBar/>
      <!-- featured film -->
      <v-img class="d-flex rounded-lg "
              v-bind=props
              :src="featuredFilmPoster"
              cover
              height="500px">
        <div class="bg-blur featured-film-overlay pa-5 rounded-lg d-flex flex-row">

            <v-sheet  class="bg-transparent">
              <div class="text-h4 text-disabled">Рекомендуем</div>
              <VDivider class="mb-3"/>
              <div class="text-h2 mb-5">{{ featuredFilmName }}</div>
              <div class="text-body-1 text-disabled"
                  height="100%">
              {{ featuredFilmDescription }}

              </div>
              <v-btn class="mt-5" variant="outlined" size="large" :to="{name: 'film', params: {id: filmStore.featuredFilm.id}}">СМОТРЕТЬ</v-btn>
            </v-sheet>
        <v-img class="rounded-lg ma-2"
              :src="featuredFilmPoster"
              cover
              width="300px">
          </v-img>
        </div>
      </v-img>
      <VDivider class="ma-2"></VDivider>
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
              single-line
              label="Название"
              density="compact"
              v-model="localFilteringSettings.name"
              @update:model-value="resetPage"
              variant="outlined"/>

              <VSelect v-model="localFilteringSettings.year"
                        class="mr-5"
                        hide-details
                        label="Год"
                        clearable
                        :items="filmStore.filmsYearRange"
                        density="compact"
                        @update:model-value="resetPage"
                        variant="outlined"/>
              <VSlider v-model="localFilteringSettings.length"
                        class="mr-5"
                        hide-details
                        thumb-label
                        label="Длительность"
                        :min="0"
                        :max="200"
                        :step="1"
                        @update:model-value="resetPage"/>
              <VSlider v-model="localFilteringSettings.rating"
                        class="mr-5"
                        hide-details
                        thumb-label
                        label="Оценка"
                        :min="1"
                        :max="10"
                        :step="1"
                        @update:model-value="resetPage"/>
              <v-btn color="accent" variant="flat" @click="acceptFilters()">Принять</v-btn>


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
            <div class="mr-5 flex-grow-1 d-flex flex-row justify-start">
              <v-btn-toggle v-model="filmStore.sortBy" 
                            mandatory 
                            border 
                            divided>
                <v-btn class="text-body-1" value='name'>Имя</v-btn>
                <v-btn class="text-body-1" value='year'>Год</v-btn>
                <v-btn class="text-body-1" value='movieLength'>Длительность</v-btn>
                <v-btn class="text-body-1" value='filmCritics'>Рейтинг</v-btn>
              </v-btn-toggle>
            </div>
            <div>
              <v-btn-toggle v-model="filmStore.sortDirection"
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
            <v-sheet v-for="film in filmsPageList" 
                    :key="film.id + filmStore.sortBy + filmStore.sortDirection"
                    class="bg-transparent">
              <FilmCard :film="film"
                        :cardWidth="tileSize[currentTileSize]"
                        :tileSize="currentTileSize"/>
            </v-sheet>
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
import NavigationBar from '@/components/NavigationBar.vue';
import FilmCard from '@/components/FilmCard.vue';

export default {
  name: 'HomePage',
  components: {
    NavigationBar,
    FilmCard
  },
  data() {
    return {
      currentFilmPage: 1,
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      tilesOnOnePage: {'small': 36, 'standart': 25, 'large': 16},
      localFilteringSettings: {
        rating: 0,
        name: '',
        year: null,
        length: 0
      }
    }
  },
  computed: {
    ...mapState(useFilmStore, ['sortBy', 'featuredFilm']),
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
      return this.filmStore.sortedNFilteredByFieldRange
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
    acceptFilters() {
      this.filmStore.filteringSettings = {
        rating: this.localFilteringSettings.rating,
        name: this.localFilteringSettings.name,
        year: this.localFilteringSettings.year,
        length: this.localFilteringSettings.length
      }
    },
    changePageSettings() {
      const begin = this.filmsOnOnePage[0];
      const end = this.filmsOnOnePage[1];
      this.filmStore.filterRange = [begin, end];
    }
  },

  watch: {
    currentTileSize() {
      this.resetPage()
      this.changePageSettings()
    },
    currentFilmPage() { 
      this.changePageSettings()
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
