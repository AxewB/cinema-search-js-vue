<template>
  <v-sheet class="flex-grow-1 pa-2" rounded>
    <v-toolbar rounded
                class="d-flex
                      flex-row
                      justify-space-around
                      align-center
                      pa-2"
                density="compact">
      <VTextField class="mr-5 flex-grow-1"
                  hide-details
                  single-line
                  label="Название"
                  density="compact"
                  v-model="filmFilters.name"
                  variant="outlined"/>

      <v-combobox v-model="filmFilters.year"
                  class="mr-5"
                  hide-details
                  label="Год"
                  :items="filmsYearRange"
                  density="compact"
                  variant="outlined"/>

      <v-slider v-model="filmFilters.length"
               class="mr-5"
               hide-details
               label="Длительность"
               :min="0"
               :max="200"
               :step="1">
        <template v-slot:append>
          <VTextField v-model="filmFilters.length"
                      hide-details
                      single-line
                      density="compact"
                      type="number"
                      style="width: 80px"/>
        </template>
      </v-slider>

      <v-slider v-model="filmFilters.rating"
               class="mr-5"
               hide-details
               label="Оценка"
               :min="1"
               :max="10"
               :step="1">
        <template v-slot:append>
          <VTextField v-model="filmFilters.rating"
                      hide-details
                      single-line
                      density="compact"
                      type="number"
                      style="width: 70px"/>
        </template>
      </v-slider>

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
      <div class="mr-5 
                  flex-grow 
                  d-flex 
                  flex-row 
                  justify-start">
        <v-btn-toggle v-model="sortBy" 
                      mandatory 
                      border 
                      divided
                      @click="acceptSorting()">
          <v-btn class="text-body-1" 
                 v-for="(item, itemName) in sortByFieldsList" 
                 :key="'sortingBy' + item + Date.now()" 
                 :value="itemName">
            {{ item }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-sheet class="bg-transparent 
                      flex-grow-1 
                      d-flex 
                      justify-center">
        <slot name="extraFilters"></slot>
      </v-sheet>

      <div>
        <v-btn-toggle v-model="sortDirection"
                      mandatory
                      class="mr-2"
                      @click="acceptSorting()">
          <v-btn icon value="ascending">
            <VTooltip text="В прямом порядке" 
                      activator="parent" 
                      location="top"/>
            <VIcon icon="mdi-sort-ascending"/>
          </v-btn>

          <v-btn icon value="descending">
            <VTooltip text="В обратном порядке" 
                      activator="parent" 
                      location="top"/>
            <VIcon icon="mdi-sort-descending"/>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-model="currentTileSize"
                      mandatory 
                      border>
          <v-btn icon value="small">
            <VTooltip text="Маленькие карточки" 
                      activator="parent" 
                      location="top"/>
            <VIcon icon="mdi-size-s"/>
          </v-btn>

          <v-btn icon value="standart">
            <VTooltip text="Средние карточки" 
                      activator="parent" 
                      location="top"/>
            <VIcon icon="mdi-size-m"/>
          </v-btn>
          
          <v-btn icon value="large">
            <VTooltip text="Большие карточки" 
                      activator="parent" 
                      location="top"/>
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
              :key="film.id + film.name + $parent.name + sortBy + sortDirection + Date.now()"
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
    /**
     * Содержит в себе список фильмов (предполагается, что он будет из хранилища)
     * Не требует дополнительной обработки, т.к. должен передаваться уже отсортированный список
     */
    films: {
      type: Array,
      required: true,
    },
    /**
     * Cписок полей, по которым можно будет отсортировать список фильмов
     * Условия сортировки будут передаваться в родительский компонент через this.emit() 
     */
    sortByFieldsList: {
      type: Object, 
    },
  },
  data() {
    return {
      tileSize: {'small': '150px', 'standart': '200px', 'large': '250px'},
      currentTileSize: 'standart',
      
      sortDirection: 'ascending',
      sortBy: 'name',
      filmFilters: {
        name: '',
        year: null,
        length: 0, 
        rating: 0,
      }
    }
  }, 
  methods: {
    /**
     * Отправляет выбранные фильтры в родительский компонент
     */
    acceptFilters() {
      this.$emit('filtered', this.filmFilters)
    },
    /**
     * Отправляет выбранный вариант сортировки в родительский компонент
     */
    acceptSorting() {
      this.$emit('sorted', {
        sortDirection: this.sortDirection, 
        sortBy: this.sortBy
      })
    }
  },
  computed: {
    ...mapState(useFilmStore, ['filmsYearRange'])
  },
  /**
  * Сбрасывает состояние списка при его повторной прогрузке
  */
  mounted() {
    this.acceptFilters();
    this.acceptSorting();
  }
}
</script>