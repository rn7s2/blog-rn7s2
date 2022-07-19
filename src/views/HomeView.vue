<template>
  <v-container fluid>
    <div v-if="isPostsOverviewLoaded">
      <v-card v-for="postOverview in postsOverview" :key="postOverview.id">
        <v-card-title>{{ postOverview.title }}</v-card-title>
        <v-card-subtitle>
          {{ postOverview.author }}，最后更新于 {{ postOverview.updated }}
        </v-card-subtitle>
        <v-card-text>{{ postOverview.abstract }}</v-card-text>
        <v-card-actions>
          <v-btn variant="tonal" @click="to('/posts/' + postOverview.id)">继续阅读</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <loading-view v-else />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  methods: {
    to(link) {
      this.$router.push({ path: link })
    }
  },
  mounted() {
    this.$store.commit('clearPostsOverview')
    this.$store.commit('fetchPostsOverview')
  },
  computed: {
    isPostsOverviewLoaded() {
      return this.$store.state.postsOverview != null
    },
    postsOverview() {
      return this.$store.state.postsOverview
    }
  }
});
</script>
