<template>
  <v-data-table
    :headers="headers"
    :items="courses"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
  >
    <template #top>
      <v-toolbar flat>
        <!-- <v-toolbar-title class="text-uppercase">Tours</v-toolbar-title> -->
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
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
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              New Course
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ isUpdate ? "Update Course": "New Course" }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="course.key"
                      label="Key"
                      required
                      :disabled="isUpdate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="course.name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="course.description"
                      label="Description"
                      required
                    ></v-text-field>
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
      <v-icon small @click="updateCourse(item)">
        mdi-square-edit-outline
      </v-icon>
      <v-icon small @click="deleteCourse(item)"> mdi-trash-can-outline </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'CoursePage',

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
      course: {
        key: '',
        name: '',
        description: '',
      },
      isUpdate: false,
    }
  },
  fetch() {
    try {
      this.$axios.get('/courses').then((courses) => {
        this.courses = courses.data.courses
      })
    } catch (err) {
      return err
    }
  },
  methods: {
    createOrUpdateCourse() {
      if (!this.isUpdate) {
        this.$axios.post('/courses', this.course).then((res) => {
          if (res.status === 200) {
            this.$swal.fire('Success', 'Tạo mới khóa học thành công', 'OK')
            this.dialog = false
            this.course = {}
          } else {
            this.$swal('Error', res.message, 'warning')
          }
        })
      }else{
        this.$axios.put('/courses', this.course).then((res) => {
          if (res.status === 200) {
            this.$swal.fire('Success', 'Cập nhật khóa học thành công', 'OK')
            this.dialog = false
            this.course = {}
            this.isUpdate = false;
          } else {
            this.$swal('Error', res.message, 'warning')
          }
        })
      }
    },
    closeDialog() {
      this.dialog = false
      this.isUpdate = false
      this.course = {}
    },
    deleteCourse(item) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this course',
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
          this.$axios.delete(`/courses/${item.key}`).then((res) => {
            // console.log(res)
            if (res.status === 200) {
              this.$swal({
                text: 'This course has been deleted!',
                background: '#242424',
                // color:'blue'
              })
              this.$fetch()
            }
          })
        }
      })
    },
    updateCourse(item) {
      this.course = item
      this.dialog = true
      this.isUpdate = true
    },
  },
}
</script>
