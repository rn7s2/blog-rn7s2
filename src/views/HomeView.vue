<template>
  <div v-if="isPostsOverviewLoaded">
    <div v-for="postOverview in postsOverview" :key="postOverview.id">
      <router-link :to="{ path: '/posts/' + postOverview.id }">{{ postOverview.title }}</router-link>
      <p>Abstract:</p>
      <p>{{ postOverview.abstract }}</p>
    </div>
  </div>
  <div v-else>加载中……</div>
</template>

<script>
export default {
  name: 'HomeView',
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
}
</script>
