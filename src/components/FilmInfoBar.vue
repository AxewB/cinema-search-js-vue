<template>
  <v-sheet class="pa-2 d-flex flex-row bg-transparent">
    <v-sheet class="bg-transparent text-disabled mr-2">
      {{ title }}
    </v-sheet>
    <v-sheet class="bg-transparent">
      {{ data }}
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  name: "FilmInfoBar",
  props: {
    'title': { type: String },
    'data': { type: String }
  } 
}
</script>