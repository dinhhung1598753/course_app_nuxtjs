<template>
  <v-container>
    <v-row>
      <v-col sm="8" class="video-container">
        <iframe
          class="video-iframe"
          :src="`https://www.youtube.com/embed/${videoId}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col sm="4" cols="12" class="video-ls">
        <v-list class="overflow-y-auto list-video">
          <v-card
            v-for="(item, i) in lessons"
            :key="i"
            cols="12"
            :color="item.color"
            @click="changeLesson(i)"
            dark
            class="video-item"
          >
            <div class="d-flex flex-no-wrap">
              <span class="video-index" v-text="i + 1"></span>
              <v-avatar class="ma-3" size="50" tile>
                <v-img :src="item.avatar"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="text-h6" v-text="item.name"></v-card-title>

                <v-card-subtitle v-text="item.description"></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CoursePage',
  data() {
    return {
      courses: [
        {
          key: '123',
          name: ' giai tich 1',
          description: ' mon giai tich 1',
        },
      ],
      lessons: [],
      courseKey: '',
      videoId:''
    }
  },
  created() {
    const arr = this.$route.path.split('/')
    this.courseKey = arr[arr.length - 1]

    try {
      this.$axios
        .get('/lessons', {
          params: {
            courseKey: this.courseKey,
          },
        })
        .then((res) => {
          // const  data = res.data;
          // for(let i; i < data.length; i++){
          //   data[i].src = 'https://cdn.vuetifyjs.com/images/cards/halcyon.png'
          // }
          this.lessons = res.data
          
          this.videoId = this.lessons[0].videoId;
          
        })
    } catch (err) {
      return err
    }

  },
  methods:{
    changeLesson(index){
      this.videoId = this.lessons[index].videoId;
    }
  }
}
</script>
<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 37.5%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.video-ls {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 37.5%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

.list-video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.video-index {
  transform: translateY(34%);
  padding-left: 10px;
}

.video-item:hover {
  background-color: #363636;
}
</style>
