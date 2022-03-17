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
        <v-list class="overflow-y-auto overflow-x-hidden list-video">
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
                <v-card-title
                  class="text-h6 card-title text"
                  v-text="item.name"
                ></v-card-title>

                <v-card-subtitle
                  class="text"
                  v-text="item.description"
                ></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-list>
      </v-col>
    </v-row>
    <div style="height: 30px"></div>
    <v-row  v-for="(item, index) in comments" :key="index">
      <v-card class="comment-card">
      <v-card-title v-html="item.userName"></v-card-title>
      <v-card-subtitle v-html="item.comment"></v-card-subtitle>
    </v-card>
    </v-row>
    
    <v-row>
      <v-text-field v-model="comment"></v-text-field>
    <v-btn class="btn-send-comment" @click="sendComment">Send</v-btn>
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
      videoId: '',
      comments: [],
      comment: '',
      lessonKey: '',
    }
  },
  fetch() {},
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
          this.lessons = res.data

          this.videoId = this.lessons[0].videoId
          this.lessonKey = this.lessons[0].key

          this.$store.socket.emit('comment-lesson', this.lessonKey)
        })
    } catch (err) {
      return err
    }
  },
  mounted() {
    const vm = this
    this.$store.socket.on('init-comment', function (data) {
      console.log("itnit")
      data = JSON.parse(JSON.stringify(data))
      const keys = Object.keys(data)
      vm.comments = []
      for (let i = 0; i < keys.length; i++) {
        data[keys[i]].id = keys[i]
        vm.comments.push(data[keys[i]])
      }
    })

    this.$store.socket.on('new-comment', function (data) {
      if (data) {
        // console.log("data",data)
        if(vm.comments.filter(x=>x.key === data.key).length === 0){
          vm.comments.push(data)
        }
        
      }
    })
  },
  beforeDestroy() {
    this.$store.socket.emit('leave-room')
  },
  methods: {
    changeLesson(index) {
      this.videoId = this.lessons[index].videoId
      this.lessonKey = this.lessons[index].key
      this.comments = []
      this.$store.socket.emit('comment-lesson', this.lessonKey)
    },
    sendComment() {
      this.$store.socket.emit('send-comment', {
        userName: this.$store.getters.getUserInfo.fullName,
        comment: this.comment,
      })
      this.comment = ''
    },
  },
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
  border-left: 1px solid #6e6767;
}

.list-video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  padding-bottom: unset;
  padding-top: unset;
}

.video-index {
  transform: translateY(34%);
  padding-left: 10px;
}

.video-item:hover {
  background-color: #363636;
}

.card-title {
  padding-top: 5px;
}

.text {
  display: block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.comment-card{
  margin-top: 3px;
  width: 100%;
}

.btn-send-comment{
  margin-top:14px
}
</style>
