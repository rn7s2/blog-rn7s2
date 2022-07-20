<template>
  <div class="mx-md-16 px-md-16" v-if="isPostDetailLoaded">
    <div class="mx-md-16">
      <h1 class="mx-1">{{ title }}</h1>
      <p class="mx-1">{{ author }}，最后更新于 {{ updateTime }}</p>
      <v-divider class="my-3" />
      <blackquote class="mx-6" v-html="abstract" />
      <v-divider class="my-3" />
      <div class="mx-6" v-html="content"></div>
    </div>
  </div>
  <loading-view v-else />
</template>

<script>
export default {
  name: 'PostView',
  created() {
    // this.$watch(
    //     () => this.$route.name,
    //     (toName) => {
    //         if (toName != 'home') {
    //             this.$store.commit('setLoadingPage')
    //             this.$store.commit('fetchPageDetail', toName)
    //         }
    //     }
    // )
  },
  mounted() {
    this.$store.commit('clearPost')
    this.$store.commit('fetchPostDetail', this.$route.params.id)
  },
  computed: {
    isPostDetailLoaded() {
      return this.$store.state.postDetail != null
    },
    author() {
      return this.$store.state.postDetail.author
    },
    updateTime() {
      return this.$store.state.postDetail.updated
    },
    title() {
      return this.$store.state.postDetail.title
    },
    abstract() {
      return this.$store.state.postDetail.abstract
    },
    content() {
      return this.markdown(this.$store.state.postDetail.content)
    }
  }
}
</script>
