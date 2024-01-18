<template>
  <v-sheet class="background-transparent" width="100%">
        <v-toolbar rounded
                  elevation="10"
                  class="d-flex">
          <v-sheet class="bg-transparent" width="33%"/>
          <v-sheet class="bg-transparent d-flex justify-center" width="33%">
            <router-link :to="{name: 'home'}">
              <v-btn exact>Home</v-btn>
            </router-link>
            <router-link :to="{name: 'recommendations'}">
              <v-btn exact>Recommendations</v-btn>
            </router-link>

            <!-- todo: just sending to a random film page -->
            <!-- also add 'to=link' -->
            <router-link exact :to="{name: 'home'}">
              <v-btn>Feeling lucky</v-btn>
            </router-link>
          </v-sheet>
          <v-sheet class="bg-transparent d-flex justify-end" width="33%">
            <router-link :to="{name: 'favourites'}" exact>
              <v-btn icon="mdi-heart" />
            </router-link>
          </v-sheet>
        </v-toolbar>
      </v-sheet>
</template>

<script>
  export default {
    name: "NavigationBar"
  }
</script>

<style lang="scss" scoped>

</style>