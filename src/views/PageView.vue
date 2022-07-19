<template>
  <div v-if="isPageDetailLoaded">
    <h1>{{ title }}</h1>
    <ul>
      <li>{{ author }}</li>
      <li>{{ updateTime }}</li>
    </ul>
    <hr />
    <div v-html="content"></div>
  </div>
  <div v-else>加载中……</div>
</template>

<script>
export default {
  name: 'PageView',
  created() {
    this.$watch(
      () => this.$route.name,
      (toName) => {
        if (toName != 'home') {
          this.$store.commit('clearPage')
          this.$store.commit('fetchPageDetail', toName)
        }
      }
    )
  },
  mounted() {
    this.$store.commit('clearPage')
    this.$store.commit('fetchPageDetail', this.$route.name)
  },
  computed: {
    isPageDetailLoaded() {
      return this.$store.state.pageDetail != null
    },
    author() {
      return this.$store.state.pageDetail.author
    },
    updateTime() {
      return this.$store.state.pageDetail.updated
    },
    title() {
      return this.$store.state.pageDetail.title
    },
    content() {
      return this.markdown(this.$store.state.pageDetail.content)
    }
  }
}
</script>
