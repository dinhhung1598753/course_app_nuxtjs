<template>
  <v-container>
    <v-card
      v-for="(item, index) in (role ? managerItems : teacherItems)"
      :key="index"
      :class="{ 'course-card': true }"
      color="#26c6da"
      dark
      width="300"
      :to="item.to"
    >
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ item.title }}</span>
      </v-card-title>

      <!-- <v-card-text class="text-h7 font-weight-light">
        "Turns out semicolon-less style is easier and safer in TS because most
        gotcha edge cases are type invalid as well."
      </v-card-text> -->

      <v-card-actions>
        <v-list-item class="grow">
          <!-- <v-list-item-avatar color="grey darken-3">
            <v-icon> mdi-account-outline </v-icon>
          </v-list-item-avatar> -->

          <!-- <v-list-item-content>
            <v-list-item-title>{{ item.artist }}</v-list-item-title>
          </v-list-item-content> -->

          <v-row align="center" justify="end">
            <!-- <v-icon class="mr-1"> mdi-heart </v-icon> -->
            <!-- <span class="subheading mr-2">256</span> -->
            <!-- <span class="mr-1">·</span>
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
            <span class="subheading">{{item.count}}</span> -->
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: "adminLayout",
  data() {
    return {
      teacherItems: [
        {
          count: '10',
          title: 'Course',
          to: "/admin/course"
        },{
          count: '10',
          title: 'Lesson',
          to: "/admin/lesson"
        },
        
      ],
      managerItems: [
        {
          count: '',
          title: 'Account',
          to: "/admin/account"
        },
        {
          count: '',
          title: 'Course',
          to: "/admin/course"
        },{
          count: '',
          title: 'Lesson',
          to: "/admin/lesson"
        },
        
      ],
      role : this.$store.getters.isManager
    }
  },
  // created(){
  //   if(this.role){
  //     for(let i =0 ; i < this.managerItems.length; i ++){
  //       this.$axios.get('/').then(x=> this.managerItems[i].count = x)
  //     }
  //   } 
    
  // }
}
</script>
<style scoped>
  .course-card{
    display: inline-block;
    margin: 15px;
  }
</style>