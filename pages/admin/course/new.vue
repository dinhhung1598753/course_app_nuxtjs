<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm password"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
        </v-col>

        
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="fullname"
            :rules="nameRules"
            label="Fullname"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneRules"
            label="Phone number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dob"
                label="Date"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="address"
            :rules="addressRules"
            label="Address"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="gender"
            :items="['Male', 'Female']"
            :rules="[(v) => !!v || 'Item is required']"
            label="Gender"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="role"
            :items="['STUDENT', 'TEACHER']"
            :rules="[(v) => !!v || 'Item is required']"
            label="Role"
            required
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'NewAccountPage',
  layout: 'adminLayout',
  data: () => ({
    show1: false,
    valid: false,
    fullname: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length >= 5 || 'Name must be more than 5 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    phoneNumber: '',
    phoneRules: [
      (v) => !!v || 'Phone number is required',
      (v) => v.length >= 8 || 'Phone number must be more than 8 characters',
    ],

    address: '',
    addressRules: [
      (v) => !!v || 'Address is required',
      (v) => v.length >= 8 || 'Address is require',
    ],
    gender: 'Male',

    role: 'STUDENT',

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dob: '',
    menu1: false,
    menu2: false,


    password: '',


    show2: false,
    password2 :'',


    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        fit: value => this.password === value || 'Confirm password is not fit'
      },
  }),

  computed: {
    checkPassword(password2){
      return this.password === password2
    }
  },

  watch: {
    date(val) {
      this.dob = this.formatDate(this.date)
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
