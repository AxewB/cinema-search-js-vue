<template>
  <v-hover #default="{isHovering, props}">
    <v-card :width="cardWidth"
            class="mr-2 ml-2 mb-5 border"
            :class="isHovering ? 'border-opacity-50' : 'border-opacity-10'"
            :elevation="isHovering ? 0 : 3"
            v-bind="props"
            rounded="lg">
      <v-img  :src="film.poster.previewUrl"
              @click="moveToFilm(film)">
        <v-sheet  class="bg-transparent 
                        d-flex 
                        flex-column" 
                  width="100%" 
                  height="100%">
          <v-sheet class="bg-transparent 
                          d-flex 
                          flex-row 
                          justify-end
                          pr-2"  
                   width="100%" >
            <v-btn rounded="0" icon 
                    @click="addFilmToFavourites(film.id)"
                    :color="isInFavourites ? 'deep-purple-darken-1' : ''">
              <VIcon icon="mdi-heart"/>
            </v-btn>
          </v-sheet>


        </v-sheet>
      </v-img>
      <v-card-title >{{film.name}}</v-card-title>
      <v-card-text class="text-caption 
                          text-disabled 
                          d-flex 
                          flex-row 
                          align-center 
                          justify-space-between">
        {{film.year}} 
        <v-sheet v-if="tileSize === 'small'"
                  class="text-mono text-body font-weight-black border pl-3 pr-3 pt-1 pb-1 rounded-lg">
          {{ (film.rating.kp / 2).toFixed(1) }}
        </v-sheet>
        <VRating v-else
          readonly
          :length="5"
          :size="24"
          :model-value="film.rating.kp / 2"
          active-color="primary"
        />
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { useUserStore } from '@/store/userStore'
import { mapStores } from 'pinia'
export default {
  name: "FilmCard",
  props: {
    cardWidth: {
      type: Number,
      required: true
    },
    film: {
      type: Object,
      required: true
    },
    tileSize: {
      type: String,
      required: true
    }
  },
  methods: {
    moveToFilm(film) {
      this.$router.push({
        name: 'film',
        params: { currentFilm: film, id: film.id }
      })
    },
    addFilmToFavourites(id) {
      this.userStore.toggleFilmInFavourites(id) 
    },
  },
  
  computed: {
    ...mapStores(useUserStore),
    isInFavourites() {
      return this.userStore.isExists(this.film.id)
    },
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active, 
.v-leave-active { 
  transition: opacity 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0
}
</style>