<template>
  <div>
    
    <v-sheet height="400px">
      <v-img height="400px" cover src="https://wallpapers.com/images/hd/film-background-fwuwqptvgv1k0jco.jpg" alt="aboba">
        <v-sheet class="d-flex 
                      align-center
                      justify-end 
                      background-transparent"
                height="50px">
        <v-sheet class="flex-grow-1
                        d-flex 
                        justify-start 
                        align-center
                        background-transparent">
          <v-btn>Home page</v-btn>
          <v-btn>Recommendations</v-btn>
        </v-sheet>
        <v-sheet class="flex-grow-1
                        d-flex 
                        justify-end 
                        align-center
                        background-transparent">
          <v-btn icon="mdi-heart"></v-btn>
        </v-sheet>
    </v-sheet>
      </v-img>
    </v-sheet>
    and there will be list of films
  </div>
</template>

<script>
  export default {
    name: 'HomePage'
  }
</script>