<template>
  <div class="mx-lg-12" v-if="isPageDetailLoaded">
    <div class="mx-sm-16 mx-lg-16 px-lg-16">
      <div class="mx-md-14 px-md-14">
        <h1 class="mx-1">{{ title }}</h1>
        <p class="mx-1">{{ author }}，最后更新于 {{ updateTime }}</p>
        <v-divider class="my-3" />
        <div class="mx-6" v-html="content"></div>
      </div>
    </div>
  </div>
  <loading-view v-else />
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
      return this.formatDateTime(this.$store.state.pageDetail.updated)
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
