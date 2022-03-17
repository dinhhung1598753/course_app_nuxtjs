<template>
  <v-app dark color="background">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="background"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="background">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn to="/chat">
        <v-icon>mdi-facebook-messenger</v-icon><span class=message-count>1</span>
      </v-btn>
       &nbsp;&nbsp;&nbsp;&nbsp;
      <v-btn v-if="isTeacherOrManager" dark to="/admin"> Admin </v-btn>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div class="text-center">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Dropdown
            </v-btn> -->
            <v-btn dark v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle-outline</v-icon>
              {{ fullName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/abc" router>
              <v-list-item-title>Thông tin tài khoản</v-list-item-title>
            </v-list-item>
            <v-list-item to="/abc" router>
              <v-list-item-title>Đổi mật khẩu</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeTheme">
              <v-list-item-title>{{ themeDark ? "Set Light": "Set Dark"}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <v-alert
        border="left"
        colored-border
        color="deep-purple accent-4"
        elevation="2"
        class="alert-notification"
        :to="`/message/`"
        :style="{'display': alert.isShow ? 'unset': 'none', opacity: alert.opacity}"
      >
        <span>
          {{ alert.title }} </span
        ><br />
        <span class="message-alert">{{ alert.subtitle }} </span>
      </v-alert>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['isAuthenticated'],
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,

      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      userActions: [
        {
          icon: 'mdi-account-circle-outline',
          title: 'Hoàng Đình Hùng',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-apps',
          title: 'User',
          to: '/user',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'HStudy',
      fullName: '',
      isTeacherOrManager: false,
      to: '/admin',
      themeDark: this.$vuetify.theme.dark,
      alert: {
        title: '',
        subtitle: '',
        opacity: 1,
        isShow: false
      },
    }
  },
  created() {
    this.isTeacherOrManager =
      this.$store.getters.isManager || this.$store.getters.isTeacher

    this.fullName = this.$store.getters.getUserInfo.fullName
  },
  beforeMount() {
    if (!this.$store.socket || !this.$store.socket.connected) {
      this.$store.socket = this.$nuxtSocket({
        name: 'work',
        // channel:'/',
        // teardown: false,
        reconnection: false,
      })
      this.$store.socket.userId = this.$store.getters.getUserInfo.id
      this.$store.socket.userName = this.$store.getters.getUserInfo.fullName
      this.$store.socket.emit('send-info', {
        userId: this.$store.getters.getUserInfo.id,
        userName: this.$store.getters.getUserInfo.fullName,
      })
      console.log('connect socket')
    }
    this.$store.socket.on('message',  (data) => {
      this.alert.opacity = 1;
      this.alert.title = data.name;
      this.alert.subtitle = data.message;
      this.alert.isShow = true;
      setInterval(()=>{
        this.alert.opacity = 0.5;
      })
      setTimeout(()=>{
        this.alert.isShow = false;
      }, 2000)
    })
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },

    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.themeDark = this.$vuetify.theme.dark
    },
  },
}
</script>
<style scoped>
/* .logout {
  position: absolute;
  bottom: 0;
  width: 100%;
} */

.alert-notification {
  width: 300px;
  height: 80px;
  position: fixed;
  right: 0;
  bottom: 50px;
  z-index: 100000000;
}

.message-alert {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  font-size: 14px;
  opacity: 0.58;
  font-weight: 300;
  
}

.message-count {
      color: white;
    font-weight: 400;
    position: absolute;
    margin-bottom: 14px;
    margin-left: 22px;
    
    /* border: 2px solid red; */

    border-radius: 16px;
    font-size: 12px;
    min-width: 14px;
    background-color: red;
    padding-left: 2px;
}


</style>
