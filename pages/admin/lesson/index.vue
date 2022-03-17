<template>
  <v-data-table
    :headers="headers"
    :items="lessons"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
  >
    <template #top>
      <v-toolbar flat>
        <!-- <v-toolbar-title class="text-uppercase">Tours</v-toolbar-title> -->

        <v-select
          v-model="courseKey"
          :items="courses"
          label="Standard"
          item-text="name"
          item-value="key"
          single-line
          hide-details
          @change="changeCourse"
        ></v-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <!-- <v-btn
          color="primary"
          class="mb-2 bg-gradient-primary"
          dark
          @click="newAccount"
        >
          New account
        </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              :disabled="!courseKey"
              v-on="on"
            >
              New Lesson
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{
                isUpdate ? 'Update Lesson' : 'New Lesson'
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lesson.key"
                      label="Key"
                      required
                      :disabled="isUpdate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lesson.name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lesson.description"
                      label="Description"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lesson.videoId"
                      label="Video ID"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="file"
                      accept="image/png, image/jpeg, image/bmp"
                      :placeholder="
                        lesson.avatar == '' ? lesson.avatar : 'Pick an avatar'
                      "
                      prepend-icon="mdi-camera"
                      label="Avatar"
                      @change="onFileChange"
                    ></v-file-input>
                    <div class="d-flex flex-column justify-space-between align-center">
                    <v-img
                      :aspect-ratio="16 / 9"
                      width="200"
                      :src="fileUrl"
                    />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="createOrUpdateCourse">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template #[`item.actions`]="{ item }">
      <!-- <v-icon small @click="viewTour(item)"> mdi-eye-outline </v-icon> -->
      <v-icon small @click="updateLesson(item)">
        mdi-square-edit-outline
      </v-icon>
      <v-icon small @click="deleteLesson(item)"> mdi-trash-can-outline </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'CoursePage',
  layout: 'adminLayout',
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Key',
          align: 'start',
          sortable: false,
          value: 'key',
        },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      courses: [],
      search: '',
      lesson: {
        key: '',
        name: '',
        description: '',
        videoId: '',
        avatar: '',
      },
      isUpdate: false,
      courseKey: '',
      lessons: [],
      file: null,
      fileUrl: '',
    }
  },
  fetch() {
    try {
      
      this.$axios
        .get('/lessons', {
          params: {
            courseKey: this.courseKey,
          },
        })
        .then((res) => {
          this.lessons = res.data
        })
    } catch (err) {
      return err
    }
  },
  created() {
    try {
      this.$axios.get('/courses').then((courses) => {
        this.courses = courses.data.courses
        this.courseKey = this.courses[0].key
         this.$axios
        .get('/lessons', {
          params: {
            courseKey: this.courseKey,
          },
        })
        .then((res) => {
          this.lessons = res.data
        })
      })
    } catch (err) {
      return err
    }
  },

  methods: {
    onChangeFile(file) {
      this.imageFile = file
    },
    changeCourse() {
      this.$fetch()
    },
    createOrUpdateCourse() {
      if (!this.isUpdate) {
        const formData = new FormData()
        formData.append('imageFile', this.file)
        formData.append('key', this.lesson.key)
        formData.append('name', this.lesson.name)
        formData.append('courseKey', this.courseKey)
        formData.append('description', this.lesson.description)
        formData.append('videoId', this.lesson.videoId)

        this.$axios.post('/lessons', formData, {}).then((res) => {
          if (res.status === 200) {
            this.$swal.fire('Success', 'Tạo mới bài học thành công', 'OK')
            this.dialog = false
            this.lesson = {}
            this.file = null
            this.$fetch()
          } else {
            this.$swal('Error', res.message, 'warning')
          }
        })
      } else {
        const formData = new FormData()
        formData.append('imageFile', this.file)
        formData.append('key', this.lesson.key)
        formData.append('name', this.lesson.name)
        formData.append('courseKey', this.courseKey)
        formData.append('description', this.lesson.description)
        formData.append('videoId', this.lesson.videoId)

        this.$axios.put('/lessons', formData, {}).then((res) => {
          if (res.status === 200) {
            this.$swal.fire('Success', 'Cập nhật bài học thành công', 'OK')
            this.dialog = false
            this.lesson = {}
            this.file = null
            this.$fetch()
          } else {
            this.$swal('Error', res.message, 'warning')
          }
        })
      }
    },
    closeDialog() {
      this.dialog = false
      this.isUpdate = false
      this.lesson ={
        key: '',
        name: '',
        description: '',
        videoId: '',
        avatar: '',
      }
      this.file = null
      this.fileUrl= ''
    },
    deleteLesson(item) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this lesson',
        icon: 'warning',
        type: 'warning',
        showCancelButton: true,
        // confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it !',
        cancelButtonText: 'No, cancel !',
        closeOnConfirm: false,
        closeOnCancel: false,
        // color: 'blue',
        background: '#242424',
      }).then((willDelete) => {
        if (willDelete.isConfirmed) {
          this.$axios.delete(`/lessons/${item.key}`).then((res) => {
            // console.log(res)
            if (res.status === 200) {
              this.$swal({
                text: 'This lesson has been deleted!',
                background: '#242424',
                // color:'blue'
              })
              this.$fetch()
            }
          })
        }
      })
    },
    updateLesson(item) {
      this.lesson = item
      this.dialog = true
      this.isUpdate = true
      this.fileUrl = item.avatar
    },
    createImage(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.fileUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange(file) {
      this.fileUrl = ''
      if (!file) {
        return
      }
      this.createImage(file)
    },
  },
}
</script>
