import { defineStore } from "pinia";
import filmsData from '@/assets/filmsObject.json'

export const useUserStore = defineStore("user", {
  state: () => ({
    /**
     * Список фильмов для закладок. У каждого фильма есть определенные параметры: добавлен в избранное, рейтинг и др.
     * Изначально были заполнены некоторые поля, чтобы было с чем экспериментировать
     * @example
     *  films: {
     *    id1: {
     *    favourites: true,
     *    rating: 5,
     *    film: object of film itself,
     *    status: 'watching' // can be 'watching', 'plans', 'completed', 'abandoned'
     *  }
     *}
    */
    films: {
      328: {
        favourite: false,
        film:filmsData.docs,
        status: "Смотрю",
      },
      370: {
        favourite: true,
        film: filmsData.docs[370],
        status: "Смотрю",
      },
      430: {
        favourite: false,
        film: filmsData.docs[430],
        status: "Смотрю",
      },
      41520: {
        favourite: false,
        film: filmsData.docs[41520],
        status: "Просмотрено",
      },
      88173: {
        favourite: false,
        film: filmsData.docs[88173],
        status: "Заброшено",
      },
      251733: {
        favourite: true,
        film: filmsData.docs[251733],
        status: "Заброшено",
      },
      420923: {
        favourite: true,
        film: filmsData.docs[420923],
        status: "Заброшено",
      },
      535341: {
        favourite: true,
        film: filmsData.docs[535341],
        status: "В планах",
      },
      835086: {
        favourite: true,
        film: filmsData.docs[835086],
        status: "В планах",
      },
    },

    // Названия списков, в которые можно добавить фильм
    lists: ['Все', "Смотрю", "В планах", "Просмотрено", "Заброшено"],

    // Настройки фильтрации и сортировки
    filterSettings: {
      listName: 'Все',
      sortBy: 'name',
      sortDirection: 'ascending',
      onlyFavourites: false,

      film: {
        name: '',
        rating: 0,
        length: 0,
        year: null,
      }
    }
  }),
  getters: {
    /**
     * Проверяет наличие фильма в закладках
     * 
     * @param {Object} state - состояние хранилища
     * @returns {Boolean} - возвращает true/false
     */
    isExists: (state) => {
      return (id) => {
        return !!state.films[id];
      };
    },
    /**
     * Проверяет, находится ли фильм с заданным id в избранных.
     *
     * @param {Object} state - Состояние
     * @param {number} id - Идентификатор фильма
     * @returns {boolean} - true, если фильм находится в избранных, в противном случае - false
     */
    isInFavourites: (state) => {
      return (id) => {
        return state.films[id] ? state.films[id].favourite : false;
      };
    },

    /** 
     * Возвращает массив фильмов, если фильтр "Только избранные" включен, 
     * а также фильтрует по выбранному списку.
     * 
     * @param {Object} state - Состояние приложения.
     * @returns {Array} - Отфильтрованный массив фильмов.
     */
    filmsArray(state) {
      let result = [];
      if (state.filterSettings.onlyFavourites)
        for (const value of Object.values(state.films)){
          if (value.favourite){
            if (state.filterSettings.listName !== 'Все') {
              if (value.status === state.filterSettings.listName){
                result.push(value.film)            
              }
            }
            else {
              result.push(value.film)            
            }
          }
        }
      else {
        for (const value of Object.values(state.films)){
          if (state.filterSettings.listName !== 'Все') {
            if (value.status === state.filterSettings.listName){
              result.push(value.film)            
            }
          }
          else {
            result.push(value.film)            
          }
        }
      }
      return result
    },
    /**
     * Фильтрует фильмы в соответствии с настройками фильтрации в состоянии.
     * 
     * @param {Object} state - Состояние 
     * @returns {Array} - Отфильтрованный и отсортированный массив фильмов.
     */
    filteredFilms(state) {
      const {sortBy, sortDirection} = state.filterSettings;
      let result;
      if (state.sortBy === 'rating') {
        result = this.filmsArray.sort((a,b) => 
          (a.rating.kp > b.rating.kp) ? 1 : ((b.rating.kp > a.rating.kp) ? -1 : 0)
        );
      }
      else {
        result = this.filmsArray.sort((a,b) => 
          (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0)
        );
      }

      result = result.filter((film) =>
        film.name.toLowerCase().includes(state.filterSettings.film.name.toLowerCase()) &&
        (state.filterSettings.film.rating ? film.rating.kp >= state.filterSettings.film.rating : true) &&
        (state.filterSettings.film.length ? film.movieLength <= state.filterSettings.film.length : true)  &&
        (state.filterSettings.film.year ? film.year === state.filterSettings.film.year : true)
      )

      if (sortDirection === 'descending'){
        result.reverse();
      }
      return result
    },
  },
  actions: {
    /**
     * Добавляет фильм в профиль пользователя.
     * 
     * @param {string} id - Идентификатор фильма.
     * @param {string} film - Объект с информацией о фильме.
     * @param {boolean} favourite - Флаг, является ли фильм избранным (по умолчанию false).
     */
    addFilmToProfile(id, film, favourite = false) {
      this.films[id] = {
        favourite,
        film,
        status: "В планах",
      };
    },
    /**
     * Удаляет фильм из профиля по его идентификатору.
     * @param {string} id - Идентификатор фильма.
     */
    removeFilmFromProfile(id) {
      delete this.films[id];
    },
    /**
     * Переключает избранное для фильма с указанным идентификатором.
     * 
     * Если фильм с указанным идентификатором уже существует, то меняет его статус "избранного".
     * 
     * Если фильм с указанным идентификатором не существует, 
     * то добавляет его в профиль и устанавливает статус "избранного".
     * 
     * @param {string} id - Идентификатор фильма
     * @param {Object} film - Объект фильма
     */
    toggleFilmFavourite(id, film = null) {
      if (this.films[id]) {
        this.films[id].favourite = !this.films[id].favourite;
      } else {
        this.addFilmToProfile(id, film, true);
      }
    },
  },
});
