<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ blogTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn-toggle v-model="toggle_none">
        <v-btn @click="to('/')">主页</v-btn>
        <v-btn v-for="page in pages" :key="page.link" @click="to(page.link)">
          {{ page.title }}
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" bottom temporary>
      <v-list>
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
    <v-footer app />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false
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
