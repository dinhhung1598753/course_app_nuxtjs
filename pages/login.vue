<template>
  <v-app background >
    <v-card class="ma-auto" width="450" color="background">
      <v-card-title class="d-flex align-center justify-center py-7">
        <h2 class="heading mainstream--text">HStudy</h2>
      </v-card-title>
      <v-card-text>
        <p class="d-flex align-center justify-center mb-2 title">
          Welcome to HStudy! 👋🏻
        </p>
        <p class="d-flex align-center justify-center mb-2">
          Please login to your account and start your work
        </p>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field
            label="Email"
            prepend-icon="mdi-email-fast-outline"
            placeholder="abc@example.com"
            v-model="email"
            :rules="emailRules"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock-outline"
            placeholder="********"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-icon="
              isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            @click:append="isPasswordVisible = !isPasswordVisible"
            v-model="password"
            :rules="passwordRules"
          />
          <span v-text="error" style="color: red; text-align: center"></span>
          <v-btn type="submit" block class="my-6 bg-gradient-primary red--text" 
            >Login</v-btn
          >
          
        </v-form>
        <v-btn to="/register" block class="my-6 bg-gradient-primary  red--text"
          >Register</v-btn
        >
      </v-card-text>

      <v-card-text class="d-flex align-center">
        <v-divider></v-divider>
        <span class="mx-3">or</span>
        <v-divider></v-divider>
      </v-card-text>

      <!-- social links -->
      <v-card-actions class="d-flex justify-center">
        <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
          <v-icon :color="link.color">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'emptyLayout',

  data() {
    return {
      error: '',
      isPasswordVisible: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
      socialLink: [
        {
          icon: 'mdi-facebook',
          color: '#4267b2',
        },
        {
          icon: 'mdi-twitter',
          color: '#1da1f2',
        },
        {
          icon: 'mdi-github',
          color: '#272727',
        },
        {
          icon: 'mdi-google',
          color: '#db4437',
        },
      ],
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const res = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          console.log("res:" ,res.data)
          // await this.$auth.setToken('local', 'Bearer ' + res.data)
          // await this.$auth.setUserToken(res.data)
          this.$router.push('/')
        } catch (error) {
          this.error = "Incorrect Email or Password"
        }
      }
    },
  },
}
</script>
