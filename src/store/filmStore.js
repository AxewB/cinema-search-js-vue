import { defineStore } from 'pinia';
import getRandomInt from '@/scripts/getRandomInt.js';
import filmsData from '@/assets/filmsObject.json' 

export const useFilmStore = defineStore('film', {
  state: () => ({
    // Исходные данные
    data: {},

    // Данные о фильмах
    films: {},

    // Настройки фильтрации
    filteringSettings: {
      rating: 0,
      name: '',
      year: null,
      length: 0
    },

    // Границы отсечения фильмов (необходмо для разделения списка на несколько страниц)
    filterRange: [0, 25],
    // Параметр, по которому осуществляется сортировка
    sortBy: 'name', // name, rating, length, year

    // Направление сортировки (прямое и инвертированное)
    sortDirection: 'ascending',
  }),
  getters: {
    /**
     * Возвращает количество фильмов в базе
     * @param {Object} state - состояние хранилища
     * @returns {Number} - количетсов фильмов
     */
    filmsCount(state) {
      if (state.filteringSettings.name || state.filteringSettings.length || state.filteringSettings.rating || state.filteringSettings.year)
        return this.filteredFilms.length
      else
        return state.films.length
    },

    /**
     * Возвращает рекомендуемый (в данном случае случайный) фильм, который отображается на главной странице
     * @param {Object} state - Состояние хранилища
     * @returns {Object} - Объект фильма
     */
    featuredFilm(state) {
      const index = getRandomInt(state.films.length)
      return state.films[index];
    },
    /**
     * Возвращает отфильтрованный массим по заданным параметрам (название, год, длительность, рейтинг)
     * @param {Object} state - состояние хранилища
     * @returns {Array} - отфильтрованный массив
     */
    filteredFilms(state) {
      return state.films.filter((film) =>
        film.name.toLowerCase().includes(state.filteringSettings.name.toLowerCase()) &&
          (state.filteringSettings.rating ? film.rating.kp >= state.filteringSettings.rating : true) &&
          (state.filteringSettings.length ? film.movieLength <= state.filteringSettings.length : true)  &&
          (state.filteringSettings.year ? film.year === state.filteringSettings.year : true)
      )
    },
    
    /**
     * Использует отфильтрованный массив и сортирует его по указанному полю (названию, году, длительности, рейтингу)
     * @param {Object} state - Состяние хранилища
     * @returns {Array} - Отсортированный и отфильтрованный массив
     */
    sortedNFilteredByField(state) {
      const result = this.filteredFilms.sort((a,b) => (a[state.sortBy] > b[state.sortBy]) ? 1 : ((b[state.sortBy] > a[state.sortBy]) ? -1 : 0));
      if (state.sortDirection === 'descending')
        result.reverse();
      return result
    },
    /**
     * Работает также, как функция sortedNFilteredByField, только обрезает массив в указанном диапазоне
     * @param {Object} state - Состояние хранилища
     * @returns {Array} - Отсортированный и отфильтрованный, обрезанный массив
     */
    sortedNFilteredByFieldRange(state){
      const result = this.filteredFilms.sort((a,b) => (a[state.sortBy] > b[state.sortBy]) ? 1 : ((b[state.sortBy] > a[state.sortBy]) ? -1 : 0));
      if (state.sortDirection === 'descending')
        result.reverse();
      return result.slice(state.filterRange[0], state.filterRange[1])
    },
    /**
     * Возвращает массив, где первый элемент - минимальный год из имеющихся в фильмах, а последний - максимальный
     * @param {Object} state - Состояние хранилища
     * @returns {Array} - Массив значений от меньшего года до большего
     */
    filmsYearRange(state) {
      let begin = 2024;
      let end = 0;
      state.films.forEach((film) => {
        begin = begin > film.year ? film.year : begin;
        end = end < film.year ? film.year : end;
      })
      
      let rangeArray = []
      for (let i = begin; i <= end; i++)
        rangeArray.push(i)
      
      return rangeArray
    },
  },
  actions: {
    /**
     * Подгрузка фильмов. Это должен быть запрос на сервер, но в данном случае данные подгружаются из файла 
     */
    filmsLoad() {
      this.data = filmsData
      this.films = filmsData.docs
    },
  }
})
