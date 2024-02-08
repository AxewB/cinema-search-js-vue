<template>
  <v-sheet  class="bg-transparent 
                  d-flex 
                  flex-column 
                  align-center 
                  pa-2" 
            width="100%">
    <v-sheet  class="d-flex 
                    flex-column 
                    bg-transparent" 
              width='1200px'>
      <NavigationBar/>
      <FilmsList  :films="filmsPageList" 
                  :sortByFieldsList="{name: 'Имя', year: 'Год', movieLength: 'Длительность', rating: 'Оценка'}"
                  :filmsCount="userStore.filmsCount"
                  :page="userStore.page"
                  @filtered="setFilters"
                  @sorted="setSorting"
                  @pageInfo="changePageInfo">
        <template #extraFilters>
          <v-sheet  class="mr-5 
                          flex-grow-1 
                          d-flex 
                          flex-row 
                          justify-center 
                          bg-transparent 
                          align-center">
            <VSelect  :items="userStore.lists" 
                      v-model="userStore.filterSettings.listName" 
                      hide-details
                      density="compact"
                      variant="outlined"/>
          </v-sheet>
          <v-btn-toggle v-model="userStore.filterSettings.onlyFavourites"
                        border
                        class="mr-2">
            <v-btn icon :value="true">
              <VTooltip text="Только избранное" activator="parent" location="top"/>
              <VIcon icon="mdi-heart"/>
            </v-btn>
          </v-btn-toggle>
        </template>
      </FilmsList>
    </v-sheet>
  </v-sheet>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import { mapStores } from 'pinia';
import { useUserStore} from '@/store/userStore';
import FilmsList from '@/components/FilmsList.vue';
export default {
  name: "BookmarksPage",
  components: {
    NavigationBar,
    FilmsList
  },
  computed: {
    ...mapStores(useUserStore),
    filmsPageList() {
      return this.userStore.filteredFilmsFromRange
    },
    sortBy() {
      return this.userStore.filterSettings.sortBy
    },
  },
  methods: {
    /**
     * Устанавливает настройки фильтрации в хранилище
     * @param {Object} filters - Объект с настройками фильтрации
     */
    setFilters(filters) {
      const {name, rating, length, year} = filters;
      this.userStore.filterSettings.film = {
        ...this.userStore.filterSettings.film, 
        name, 
        year, 
        rating,
        length
      }
    },
    /**
     * Устанавливает настройки сортировки в хранилище
     * @param {Object} sortSettings - Объект с настройками сортировки
     */
    setSorting(sortSettings) {
      const {sortDirection, sortBy} = sortSettings;
      console.log(sortSettings);
      this.userStore.filterSettings = {
        ...this.userStore.filterSettings, 
        sortDirection, 
        sortBy
      }
    },
    changePageInfo(pageInfo) {
      this.userStore.page = pageInfo.currentPage
      this.userStore.filterSettings.range = [pageInfo.range.begin, pageInfo.range.end]
    }
  }
}
</script>
