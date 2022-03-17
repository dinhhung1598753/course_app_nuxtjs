<template>
  <v-container>
    <div class="top">
      <v-btn :class="{ 'find-course': true }" value="recent" to="/course">
        <v-icon>mdi-magnify</v-icon>
        <span>Find Course</span>
      </v-btn>
    </div>
    <v-card
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'course-card': true }"
      color="#26c6da"
      dark
      width="300"
      :to="'/course/' + item.key"
    >
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ item.name }}</span>
      </v-card-title>

      <v-card-text class="text-h7 font-weight-light">
        {{ item.description }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-icon> mdi-account-outline </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.user.fullName }}</v-list-item-title>
          </v-list-item-content>

          <v-row class="count-sub" align="center" justify="end">
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
            <span class="subheading">{{item.countSubscribe}}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  // middleware: ['isAuthenticated'],
  data() {
    return {
      color: '#1F7087',
      items: [
        
      ],
    }
  },
  created(){
    try {
        this.$axios
          .get('/users/course'
          )
          .then((res) => {
            // console.log("data: ",res.data[0])
            this.items = res.data
          })
      } catch (err) {
        return err
      }
  },
  mounted(){
    
  }
}
</script>
<style scoped>
.course-card {
  display: inline-block;
  margin: 15px;
}

.find-course {
  position: fixed;
  right: 15px;
  top: 76px;
}

.top{
  margin: 25px;
}

.count-sub{
  flex: none;
}
</style>