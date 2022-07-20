<template>
  <v-theme-provider :theme="this.darkMode ? 'dark' : 'light'">
    <v-app>
      <v-app-bar app>
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-toolbar-title>
            <v-tabs>
              <v-tab class="text-h6" @click="to('/')"> {{ blogTitle }}</v-tab>
            </v-tabs>
          </v-toolbar-title>
        </template>
        <v-spacer />
        <v-switch class="d-flex justify-end align-center mr-2" v-model="darkMode" :label="`暗色`"></v-switch>
        <v-btn-toggle class="d-none d-md-flex" v-model="toggle_none">
          <v-btn @click="to('/')">主页</v-btn>
          <v-btn v-for="page in pages" :key="page.link" @click="to(page.link)">
            {{ page.title }}
          </v-btn>
        </v-btn-toggle>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" bottom temporary>
        <v-list>
          <v-switch class="d-flex align-center ml-5" v-model="darkMode" :label="`暗色`"></v-switch>
          <v-list-item @click="to('/')">主页</v-list-item>
          <v-list-item v-for="page in pages" :key="page.link" @click="to(page.link)">
            {{ page.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      darkMode: true
    }
  },
  mounted() {
    this.$store.commit('fetchBlogBasicInfo')
  },
  methods: {
    to(link) {
      this.$router.push({ path: link })
    }
  },
  computed: {
    blogTitle() {
      return this.$store.state.blogTitle
    },
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>
