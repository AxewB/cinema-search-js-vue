<template>
  <v-card :width="cardWidth"
          class="mr-2 ml-2 mb-5"
          @click="moveToFilm(film)">
    <v-img :src="film.poster.previewUrl" >
      <v-sheet class="bg-transparent d-flex flex-row justify-end"  width="100%" >
        <v-btn rounded="0" icon>
          <VIcon icon="mdi-bookmark"/>
        </v-btn>
        <v-btn rounded="0" icon>
          <VIcon icon="mdi-heart"/>
        </v-btn>
      </v-sheet>
    </v-img>
    <v-card-title >{{film.name}}</v-card-title>
    <v-card-text class="text-caption text-disabled d-flex flex-row align-center justify-space-between">
      {{film.year}} 
      <v-rating
        readonly
        :length="5"
        :size="24"
        :model-value="film.rating.kp / 2"
        active-color="primary"
      />
    </v-card-text>
  </v-card>
</template>

<script>
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
      }

    },
    methods: {
      cardClick() {
        this.$emit('cardClick');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>