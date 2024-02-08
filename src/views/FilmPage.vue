<template>
  <v-sheet  
    class="bg-transparent 
      d-flex 
      justify-center 
      pa-2" 
    width="100%"
  >
    <v-sheet 
      class="bg-transparent" 
      width="1200px" 
      rounded
    >
      <VImg 
        :src="film.poster.url" 
        cover 
        class="rounded-lg">
            
        <v-sheet class="background-overlay">
          <NavigationBar>
            <template #start>
              <v-btn  
                prepend-icon="mdi-arrow-left" 
                variant="tonal"
                @click="$router.go(-1)"
              >
                Назад
              </v-btn>
            </template>
          </NavigationBar>

          <!-- filler -->
          <VSheet 
            class="bg-transparent 
              pa-5 
              d-flex 
              justify-space-between" 
            height="5%"/>

          <v-sheet  
            class="bg-transparent 
              d-flex 
              flex-row 
              justify-start
              pa-5" 
            height="45%" 
            rounded>
            <v-sheet 
              class="mr-5 bg-transparent" 
              width="250px"
            >
              <VImg 
                class="rounded-lg 
                  elevation-10" 
                :src="film.poster.url" 
                cover/>
              
              <VDivider class="ma-2" /> 

              <VBtn 
                v-if="!userStore.isExists(filmId)"  
                @click="addFilmToUserList()" 
                text="Добавить в список"/>
              <v-sheet  
                v-else 
                class="d-flex 
                  flex-column 
                  bg-transparent" 
                width="100%"
              >
                <v-sheet  
                  class="d-flex 
                    flex-row 
                    bg-transparent" 
                  width="100%"
                >
                  <VSelect  
                    :items="userStore.lists" 
                    v-model="userStore.films[filmId].status" 
                    hide-details
                    class="flex-grow-1 text-capitalize"
                    density="comfortable"
                    variant="solo"/>
                </v-sheet>
                <v-sheet 
                  width="100%" 
                  class="bg-transparent 
                    mt-2 
                    d-flex"
                >
                  <v-btn  
                    icon
                    rounded
                    variant="tonal"
                    @click="addFilmToFavourites()"
                    :color="isInFavourites ? 'primary' : ''"
                    class="mr-2 flex-grow-1">
                    <VTooltip 
                      text="Добавить в избранное" 
                      activator="parent" 
                      location="top"/>
                    <VIcon icon="mdi-heart" />
                  </v-btn>
                  <v-btn  
                    icon 
                    rounded 
                    @click="removeFilmFromList()" 
                    variant="tonal" 
                    color="error"
                  >
                    <VTooltip 
                      text="Удалить из списка" 
                      activator="parent" 
                      location="top"/>
                    <VIcon icon="mdi-delete"/>
                  </v-btn>  
                </v-sheet>
                <v-sheet  
                  class="d-flex 
                    flex-row 
                    bg-transparent 
                    justify-center" 
                  width="100%">
                  <VRating  
                    v-model="userStore.films[this.$route.params.id].rating"
                    hover
                    half-increments/>
                </v-sheet>
              </v-sheet>
              
              <VDivider class="ma-2"/>
              <v-list 
                v-if="film.watchability.items" 
                rounded
              >
                <v-list-subheader>
                  ГДЕ ПОСМОТРЕТЬ
                </v-list-subheader>
                
                <v-list  
                  max-height="250px" 
                  class="overflow-auto"
                >
                  <v-list-item 
                    class="mb-2 
                      d-flex 
                      align-center" 
                    v-for="cinema in film.watchability.items" 
                    :key="cinema._id" 
                    :href="cinema.url" 
                    size="x-large" 
                    icon
                  >
                    <VAvatar 
                      :image="cinema.logo.url" 
                      size="30" 
                      class="mr-2"/>
                    {{ cinema.name }}
                  </v-list-item>
                </v-list>
              </v-list>
            </v-sheet>
            <v-sheet  
              class="d-flex 
                flex-column 
                bg-transparent" 
              width="100%" >
              <v-sheet 
                class="text-h2 
                  bg-transparent 
                  mt-10 
                  d-flex
                  align-center" 
                width="100%" >
                <v-sheet class="flex-grow-1 bg-transparent">
                  {{  film.name }}
                </v-sheet>
                <v-sheet  
                  class="rounded-lg 
                    pa-2 
                    text-h3 
                    elevation-10">
                  {{ film.rating.kp.toFixed(1) }}
                </v-sheet>
              </v-sheet>
              <v-sheet  
                class="text-body-1 
                  bg-transparent 
                  pa-2 
                  mt-10" 
                width="100%" >
                {{ film.description }}
              </v-sheet>
              
              <VDivider class="ma-2"/>
              <FilmInfoBar  
                v-if="film.year" 
                :title="'Год'" 
                :data="film.year.toString()"/>
              <FilmInfoBar  
                v-if="film.alternativeName" 
                :title="'Альтернативное название'" 
                :data="film.alternativeName"/>
              <FilmInfoBar  
                v-if="film.movieLength" 
                :title="'Длительность (мин)'" 
                :data="film.movieLength.toString()"/>
              <FilmInfoBar  
                v-if="film.type" 
                :title="'Тип фильма'" 
                :data="film.type"/>
              <FilmInfoBar  
                v-if="otherNames" 
                :title="'Другие названия'" 
                :data="otherNames"/>

              <VDivider class="ma-2"/>
              
              <div class="text-h6 mb-2">
                Рекомендации
              </div>
              
              <v-sheet 
                class="d-flex 
                  flex-row 
                  bg-transparent 
                  mx-auto" 
                height="250px" 
                max-width="900px"
              >
                <v-slide-group 
                  show-arrows 
                  class="overflow-auto"
                >
                  <v-slide-group-item 
                    v-for="film in recommendedFilms"
                    :key="film.id + Date.now() + 'recommendations'"
                  >  
                    <FilmCard
                      :film="film"
                      :cardWidth="'130px'"
                      :tileSize="'small'"
                      :showDetails="false"/>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </VImg>  
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapStores } from 'pinia';
import { useFilmStore } from '@/store/filmStore';
import { useUserStore } from '@/store/userStore';
import FilmInfoBar from '@/components/FilmInfoBar.vue'
import NavigationBar from '@/components/NavigationBar.vue';
import getRandomInt from '@/scripts/getRandomInt.js'
import FilmCard from '@/components/FilmCard.vue';
export default {
  name: "FilmPage", 
  components: {
    FilmInfoBar,
    NavigationBar, 
    FilmCard
  },
  data() {
    return {
      recommendedFilms: [],
    }
  },
  methods: {
    // Добавляет фильм в избранное
    addFilmToFavourites() {
      this.userStore.toggleFilmFavourite(this.filmId, this.film) 
    },

    // Добавляет фильм в список (закладки)
    addFilmToUserList() {
      this.userStore.addFilmToProfile(this.filmId, this.film)
    },

    // Удаляет фильм из закладок
    removeFilmFromList() {
      this.userStore.removeFilmFromProfile(this.filmId)
    },

    // Переход к рекомендуемому фильму
    moveToRecommendedFilmPage(filmID) {
      this.$router.push({
        name: 'film',
        params: { id: filmID }
      })
    },
  },
  computed: {
    ...mapStores(useFilmStore, useUserStore),
    // Идентификатор фильма. Удобно для переиспользования, чтобы не писать постоянно this.$route.params.id
    filmId() {
      return this.$route.params.id
    },
    
    // Объект с самим фильмом
    film() {
      return this.filmStore.films.find(film => film.id == this.filmId)
    },
    
    // Проверка на наличие фильма в избранном
    isInFavourites() {
      return this.userStore.isInFavourites(this.filmId)
    },

    // Массив других названий фильма
    otherNames() {
      let names = '';
      for (let i = 0; i < this.film.names.length; i++) {
        if (!i) 
          names = this.film.names[i].name
        else {
          names += ', ' + this.film.names[i].name
        }
      }
      return names
    },
  },
  mounted() {
    let randomIDs = [];
    this.recommendedFilms = [];

    for (let i = 0; i < 10; i++) {
      const randomID = getRandomInt(this.filmStore.filmsCount)
      if (!randomIDs.includes(randomID)) {
        randomIDs.push(randomID)
        this.recommendedFilms.push(this.filmStore.films[randomID])
      } 
      else {
        i--;
      }
    }
  }
}
</script>

<style scoped>
.background-overlay {
  width: 100%;
  height: 100%;
  background: rgb(28,27,34);
  background: linear-gradient(0deg, rgba(28,27,34,1) 75%, rgba(28,27,34,0) 100%);
  backdrop-filter: blur(10px);
}
</style>