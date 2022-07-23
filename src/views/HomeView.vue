<template>
  <v-container fluid>
    <div class="mx-lg-12" v-if="isPostsOverviewLoaded">
      <div class="mx-sm-16 mx-lg-16 px-lg-16">
        <div class="mx-4 mx-md-16 px-md-16 text-h6">最新文章</div>
        <div class="mx-md-14 px-md-14">
          <v-card class="mt-4" v-for="postOverview in postsOverview" :key="postOverview.id"
            @click="to('/posts/' + postOverview.id)">
            <v-card-title class="text-h5">{{ postOverview.title }}</v-card-title>
            <v-card-subtitle>
              {{ postOverview.author }}，最后更新于 {{ new Date(postOverview.updated).format('yyyy-MM-dd HH:mm') }}
            </v-card-subtitle>
            <v-card-text class="mx-2" v-html="this.markdown(postOverview.abstract)"></v-card-text>
            <v-card-actions>
              <v-btn variant="tonal" @click="to('/posts/' + postOverview.id)">继续阅读</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
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
