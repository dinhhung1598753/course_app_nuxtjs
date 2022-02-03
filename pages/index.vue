<template>
<v-container>
 <div>
    <v-btn value="recent">
        <span>Recent</span>
  
        <v-icon>mdi-history</v-icon>
      </v-btn>
 </div>
  <!-- <p v-if="role">day la manager</p> -->
  <v-card
      v-for="(item, index) in items"
      :key="index"
      :class='{"course-card": true}'
      color="#26c6da"
      dark
      max-width="300"
      :to="'/course/' + item.key"
    >
      <v-card-title>
        
        <span class="text-h5 font-weight-bold" >{{ item.title }}</span>
      </v-card-title>
  
      <v-card-text class="text-h7 font-weight-light">
        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-text>
  
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-icon>
              mdi-account-outline
            </v-icon>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>{{ item.artist }}</v-list-item-title>
          </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">
              mdi-heart
            </v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">
              mdi-share-variant
            </v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
</v-container>
  

  
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ["isAuthorization"],
  data() {
    return {
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
          key: "gt1"
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
          key: "gt2"
        },
      ],
    }
  },
  
}
</script>
<style scoped>
  .course-card{
    display: inline-block;
    margin: 15px;
  }
</style>