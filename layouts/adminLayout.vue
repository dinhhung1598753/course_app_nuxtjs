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
      <v-btn dark @click="changeTheme">
        {{ themeDark ? "Set Light": "Set Dark"}}
      </v-btn>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <v-btn v-if="isTeacherOrManager" dark to="/" >
        Home
      </v-btn>
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
  name: 'AdmintLayout',
  middleware: ['isAuthorization'],
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,

      managerItems: [
        {
          icon: 'mdi-apps',
          title: 'Admin',
          to: '/admin',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Account',
          to: '/admin/account',
        },
        {
          icon: 'mdi-text-box-multiple',
          title: 'Course',
          to: '/admin/course',
        },
        {
          icon: 'mdi-file-document-outline',
          title: 'Lesson',
          to: '/admin/lesson',
        },
      ],
      teacherItems: [
        {
          icon: 'mdi-apps',
          title: 'Admin',
          to: '/admin',
        },
        {
          icon: 'mdi-text-box-multiple',
          title: 'Course',
          to: '/admin/course',
        },
        {
          icon: 'mdi-apps',
          title: 'Lesson',
          to: '/admin/lesson',
        },
      ],
      studentItems: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
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
      themeDark : this.$vuetify.theme.dark
    }
  },
  created() {
    this.isTeacherOrManager =
      this.$store.getters.isManager || this.$store.getters.isTeacher

    this.fullName = this.$store.getters.getUserInfo.fullName

    this.items = this.$store.getters.isManager ? this.managerItems : this.teacherItems
  },
  mounted() {
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
      console.log("connect socket")
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
    
    changeTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.themeDark = this.$vuetify.theme.dark
    }
  },
}
</script>
<style scoped>
/* .logout {
  position: absolute;
  bottom: 0;
  width: 100%;
} */
</style>
