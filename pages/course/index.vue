<template>
  <v-container>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-text-field v-model="searchValue" hide-details="auto"></v-text-field>

        <!-- <v-spacer></v-spacer> -->

        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-card
      v-for="(item, index) in courses"
      :key="index"
      class="mx-auto course-card"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ item.name }}
          </div>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions @click="addCourse(item.key)">
        <v-btn outlined rounded text> Add Course </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IndexCourse',
  data() {
    return {
      courses: [],
      searchValue: '',
    }
  },
  created() {
    try {
      // console.log(this.searchValue)
      this.$axios
        .get('/courses/search', {
          params: {
            searchValue: this.searchValue,
          },
        })
        .then((res) => {
          this.courses = res.data
        })
    } catch (err) {
      return err
    }
  },
  methods: {
    search() {
      try {
        // console.log(this.searchValue)
        this.$axios
          .get('/courses/search', {
            params: {
              searchValue: this.searchValue,
            },
          })
          .then((res) => {
            this.courses = res.data
          })
      } catch (err) {
        return err
      }
    },
    addCourse(key) {
      this.$axios
        .post('/users/course', {
          courseKey: key,
        })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
<style scoped>
.course-card {
  margin: 15px;
}
</style>