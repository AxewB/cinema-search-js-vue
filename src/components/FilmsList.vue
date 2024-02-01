<template>
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
        v-model="filmFilters.name"
        @update:model-value="resetPage"
        variant="outlined"/>

      <v-combobox v-model="filmFilters.year"
                class="mr-5"
                hide-details
                label="Год"
                :items="filmsYearRange"
                density="compact"
                variant="outlined"
                @update:model-value="resetPage"/>

      <VSlider v-model="filmFilters.length"
                class="mr-5"
                hide-details
                thumb-label
                label="Длительность"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="resetPage"/>

      <VSlider v-model="filmFilters.rating"
                class="mr-5"
                hide-details
                thumb-label
                label="Оценка"
                :min="1"
                :max="10"
                :step="1"
                @update:model-value="resetPage"/>

      <v-btn color="accent" variant="flat" @click="acceptFilters()">Принять</v-btn>


    </v-toolbar>

    <v-toolbar class="mt-2
                      pa-2
                      d-flex
                      flex-row
                      align-center
                      justify-start"
                rounded
                density="compact">
      <div class="mr-5 flex-grow d-flex flex-row justify-start">
        <v-btn-toggle v-model="sortByField" 
                      mandatory 
                      border 
                      divided
                      @click="acceptSorting()">
          <v-btn  class="text-body-1" 
                  v-for="(item, itemName) in sortByFieldsList" 
                  :key="'sortingBy' + item + Date.now()" 
                  :value="itemName">
            {{ item }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-sheet class="bg-transparent flex-grow-1 d-flex justify-center">
        <slot name="extraFilters"></slot>
      </v-sheet>

      <div>
        <v-btn-toggle v-model="sortDirection"
                    mandatory
                    class="mr-2"
                    @click="acceptSorting()">
          <v-btn icon value="ascending">
            <VTooltip text="В прямом порядке" activator="parent" location="top"/>
            <VIcon icon="mdi-sort-ascending"/>
          </v-btn>
          <v-btn icon value="descending">
            <VTooltip text="В обратном порядке" activator="parent" location="top"/>
            <VIcon icon="mdi-sort-descending"/>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-model="currentTileSize"
                      mandatory 
                      border>
          <v-btn value="small" icon>
            <VTooltip text="Маленькие карточки" activator="parent" location="top"/>
            <VIcon icon="mdi-size-s"/>
          </v-btn>
          <v-btn value="standart" icon>
            <VTooltip text="Средние карточки" activator="parent" location="top"/>
            <VIcon icon="mdi-size-m"/>
          </v-btn>
          <v-btn value="large" icon>
            <VTooltip text="Большие карточки" activator="parent" location="top"/>
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
      <v-sheet v-for="film in films" 
              :key="film.id + Date.now()"
              class="bg-transparent">
        <FilmCard :film="film"
                  :cardWidth="tileSize[currentTileSize]"
                  :tileSize="currentTileSize"/>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { useFilmStore } from '@/store/filmStore'
import { mapState } from 'pinia'
import FilmCard from './FilmCard.vue'
export default {
  name: "FilmsList",
  components: {
    FilmCard
  },  
  props: {
    // отрисовываемый список фильмов (отфильтрованный и отсортированный)
    // он будет изменяться вне компоненты - в хранилище

    films: {
      type: Array,
      required: true,
    },
    // список полей, по которым можно будет отсортировать список фильмов
    // вид: 
    // { 
      // sort1: { 
        // name: 'названиеДляОтображения', 
        // value: 'value1' 
      // } 
    // }
    // условия сортировки будут передаваться через this.emit() в виде: { sort1: "value1", sort2: "value2" } 
    sortByFieldsList: {
      type: Object, 
    },
  },
  data() {
    return {
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      
      sortDirection: 'ascending',
      sortByField: 'name',
      filmFilters: {
        name: '',
        year: null,
        length: 0, 
        rating: 0,
      }
    }
  }, 
  methods: {
    acceptFilters() {
      this.$emit('filtered', this.filmFilters)
    },
    acceptSorting() {
      this.$emit('sorted', {
        sortDirection: this.sortDirection, 
        sortByField: this.sortByField
      })
    }
  },
  computed: {
    ...mapState(useFilmStore, ['filmsYearRange'])
  } 
}
</script>

<style lang="scss" scoped>

</style>