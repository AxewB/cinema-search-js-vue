import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    favourites: []
  }),
  getters: {
    isExists: (state) => {
      return (id) => state.favourites.some((filmId) => filmId === id)
    }
  },
  actions: {
    toggleFilmInFavourites(id) {
      if (this.isExists(id)) {
        const index = this.favourites.indexOf(id)
        this.favourites.splice(index, 1)
      }
      else 
        this.favourites.push(id)
    }

  }
})