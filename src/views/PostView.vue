<template>
  <div v-if="isPageDetailLoaded">
    <h1>{{ title }}</h1>
    <ul>
      <li>{{ author }}</li>
      <li>{{ updateTime }}</li>
    </ul>
    <hr />
    <div v-html="abstract"></div>
    <hr />
    <div v-html="content"></div>
  </div>
  <div v-else>加载中……</div>
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
    isPageDetailLoaded() {
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
