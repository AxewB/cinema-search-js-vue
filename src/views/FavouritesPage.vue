<template>
  <v-sheet class="bg-transparent d-flex justify-center pa-2" width="100%">
    <v-sheet class="bg-transparent" width="1200px">
      <NavigationBar/>
      <v-toolbar class="mt-2
                            pa-2
                            d-flex
                            flex-row
                            align-center
                            justify-start"
                      rounded
                      density="compact">
            <div class="mr-5 flex-grow-1 d-flex flex-row justify-start">
              <v-btn-toggle v-model="userStore.filterSettings.sortBy" 
                            mandator border divided>
                <v-btn class="text-body-1" value='name'>Имя</v-btn>
                <v-btn class="text-body-1" value='year'>Год</v-btn>
                <v-btn class="text-body-1" value='movieLength'>Длительность</v-btn>
                <v-btn class="text-body-1" value='filmCritics'>Рейтинг</v-btn>
              </v-btn-toggle>
            </div>
            <v-btn-toggle v-model="userStore.filterSettings.onlyFavourites"
                            border
                            class="mr-2">
              <v-btn icon :value="true">
                <VTooltip text="Только избранное" activator="parent" location="top"/>
                <VIcon icon="mdi-heart"/>
              </v-btn>
            </v-btn-toggle>
            <div>
              

              <!-- <VTooltip text="Only favourites" activator="parent" location="top"/>
                <VIcon icon="mdi-heart"/> -->
              <v-btn-toggle v-model="userStore.filterSettings.sortDirection"
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
      
      <v-sheet class="d-flex flox-row flex-wrap justify-lg-space-around mt-2 pt-2">
        <v-sheet v-for="film in filmsPageList" 
                :key="film.id + userStore.filterSettings.sortBy + userStore.filterSettings.sortDirection + 'favourite' + Date.now()"
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
import { useUserStore} from '@/store/userStore';
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
    ...mapStores(useUserStore),
    filmsPageList() {
      return this.userStore.filteredFilms
    },
    sortBy() {
      return this.userStore.filterSettings.sortBy
    }
  }
}
</script>
