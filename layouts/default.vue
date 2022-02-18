<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="isTeacherOrManager" dark :to="to" @click="changeViewAdmin">
        {{ this.to === "/admin" ? "Admin": "Home"}}
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
  name: 'DefaultLayout',
  middleware: ['isAuthenticated'],
  data() {
    return {
      clipped: false,
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
      // studentItems: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Welcome',
      //     to: '/',
      //   },
      // ],
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
      to: '/admin'
    }
  },
  created() {
    this.isTeacherOrManager = this.$store.getters.isManager || this.$store.getters.isTeacher
    // if(this.$store.getters.isStudent){
    //   try {
    //     this.$axios
    //       .get('/users/course'
    //       )
    //       .then((res) => {
    //         console.log("data: ",res.data[0])
    //         this.items = res.data
    //       })
    //   } catch (err) {
    //     return err
    //   }
    // }
    // else{
    // this.items = this.$store.getters.isManager
    //   ? this.managerItems
    //   : this.$store.getters.isTeacher
    //   ? this.teacherItems
    //   : this.studentItems
    // }

    this.fullName = this.$store.getters.getUserInfo.fullName
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
    changeViewAdmin(){
      this.items = this.$store.getters.isManager
      ? this.managerItems
      : this.teacherItems;
      this.to = this.to === "/admin" ? "/":"/admin"
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
