<template>
  <v-sheet  
    class="bg-transparent 
      d-flex 
      justify-center 
      pa-2" 
    width="100%">
    <v-sheet 
      class="bg-transparent" 
      width="1200px"
    >
      <NavigationBar/>
      <v-img  
        class="d-flex 
          rounded-lg"
        v-bind=props
        :src="featuredFilmPoster"
        cover
        height="500px">
        <div  
          class="bg-blur 
            featured-film-overlay 
            pa-5 
            rounded-lg 
            d-flex 
            flex-row"
        >

          <v-sheet  class="bg-transparent">
            <div class="text-h4 text-disabled">
              Рекомендуем
            </div>
            <VDivider class="mb-3"/>
            <div class="text-h2 mb-5">
              {{ featuredFilmName }}
            </div>
            <div  
              class="text-body-1 
                text-disabled"
              height="100%">
              {{ featuredFilmDescription }}
            </div>
            <v-btn  
              class="mt-5" 
              variant="outlined" 
              size="large" 
              :to="{name: 'film', params: {id: filmStore.featuredFilm.id}}"
            >
              СМОТРЕТЬ
            </v-btn>
          </v-sheet>
          <VImg  
            class="rounded-lg ma-2"
            :src="featuredFilmPoster"
            cover
            width="300px"/>
        </div>
      </v-img>
      <VDivider class="ma-2"/>
      <!-- films list -->
      <v-sheet  
        class="bg-transparent 
          d-flex 
          flex-row 
          pa-5 
          pt-0" 
        width="100%">
        <FilmsList  
          :films="filmsPageList" 
          :sortByFieldsList="{name: 'Имя', year: 'Год', movieLength: 'Длительность', rating: 'Оценка'}"
          :filmsCount="filmStore.filmsCount"
          @filtered="setFilters"
          @sorted="setSorting"
          @pageInfo="changePageSettings"/>
      </v-sheet>
      <VPagination 
        :length="pageCount" 
        v-model="currentFilmPage"/>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import {useFilmStore} from '@/store/filmStore'
import NavigationBar from '@/components/NavigationBar.vue';
import FilmsList from '@/components/FilmsList.vue'
export default {
  name: 'HomePage',
  components: {
    NavigationBar,
    FilmsList
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
  },
  methods: {
    /**
     * Устанавливает значения для фильтрации фильмов
     * @param {Object} filters - Объект с настройками фильтрации
     */
    setFilters(filters) {
      const {name, rating, year, length} = filters
      this.filmStore.filteringSettings = {
        ...this.filmStore.filteringSettings,
        rating,
        name,
        year,
        length
      }
    },
    /**
     * Устанавливает значения для сортировки фильмов
     * @param {Object} sortSettings - Объект с настройками сортировки
     */
    setSorting(sortSettings) {
      const {sortDirection, sortBy} = sortSettings;
      this.filmStore.sortBy = sortBy;
      this.filmStore.sortDirection = sortDirection;
    },
    // Устанавливает границы для отсечения фильмов в хранилище
    changePageSettings(pageInfo) {
      const begin = pageInfo.range.begin;
      const end = pageInfo.range.end;
      this.filmStore.filterRange = [begin, end];
    }
  },
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