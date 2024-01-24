<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="" width="1200px">
      <NavigationBar/>
      <v-toolbar class="mt-2
                            pa-2
                            d-flex
                            flex-row
                            align-center
                            justify-start"
                      rounded
                      density="compact">
            <div class="mr-5 text-body-1 text-disabled" >Сортировать по</div>
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
          <v-sheet class="d-flex flox-row flex-wrap justify-lg-space-around mt-2">
            <v-sheet v-for="film in filmsPageList" 
                    :key="film.id + filmStore.sortBy + filmStore.sortDirection + 'favourite' + Date.now()"
                    class="bg-transparent">
              <FilmCard :film="film"
                        :cardWidth="tileSize[currentTileSize]"
                        :tileSize="currentTileSize"/>
            </v-sheet>
          </v-sheet>
          
          
    </v-sheet>
    
  </v-sheet>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import { mapStores } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
import FilmCard from '@/components/FilmCard.vue';
export default {
  name: "FavouritesPage",
  data() {
    return { 
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      tilesOnOnePage: {'small': 36, 'standart': 25, 'large': 16},
    }
  },
  components: {
    NavigationBar,
    FilmCard
  },
  computed: {
    ...mapStores(useFilmStore),
    filmsPageList() {
      return this.filmStore.favouriteFilms
    },
    sortBy() {
      return this.filmStore.sortBy
    }
  }
}
</script>
