<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-for="page in pages" :key="page.link">
        <router-link :to="{ path: page.link }">{{ page.title }}</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {
  mounted() {
  },
  computed: {
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>

<style>
</style>
