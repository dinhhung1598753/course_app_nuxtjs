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
      <div class="text-center">
        <v-menu offset-y>
          <template  #activator="{ on, attrs }">
            <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Dropdown
            </v-btn> -->
            <v-btn dark v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle-outline</v-icon>
              hung
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/abc" router >
              <v-list-item-title>Thông tin tài khoản</v-list-item-title>
            </v-list-item>
            <v-list-item to="/abc" router>
              <v-list-item-title>Đổi mật khẩu</v-list-item-title>
            </v-list-item>
            <v-list-item to="/abc" router>
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
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item
          v-for="(item, i) in userActions"
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

        <v-list-item :class="{ logout: true }" to="/aaa" router>
          <v-list-item-action>
            <v-icon> mdi-logout </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      
      managerItems: [
        {
          icon: 'mdi-apps',
          title: 'Account',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Course',
          to: '/inspire',
        },
        {
          icon: 'mdi-apps',
          title: 'Lesson',
          to: '/user',
        },
        {
          icon: 'mdi-apps',
          title: 'Document',
          to: '/user',
        },
      ],
      teacherItems: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Account',
        //   to: '/',
        // },
        {
          icon: 'mdi-chart-bubble',
          title: 'Course',
          to: '/inspire',
        },
        {
          icon: 'mdi-apps',
          title: 'Lesson',
          to: '/user',
        },
        {
          icon: 'mdi-apps',
          title: 'Document',
          to: '/user',
        },
      ],
      studentItems: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
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
      items : this.$store.getters.isManager ? this.managerItems : (this.$store.getters.isTeacher ? this.teacherItems : this.studentItems),
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
      title: 'Vuetify.js',
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
