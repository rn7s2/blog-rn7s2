import { createStore } from 'vuex'
import Axios from 'axios'

export default createStore({
  state: {
    blogTitle: '',
    pages: [],
    pageDetail: null,
    postsOverview: null,
    postDetail: null
  },
  getters: {
  },
  mutations: {
    // blog basic info
    fetchBlogBasicInfo: async (state) => {
      await Axios.get('/api/config').then(response => {
        state.blogTitle = response.data.title
      })
    },

    // pages
    setPages: (state, pages) => { state.pages = pages },

    // page
    clearPage: state => { state.pageDetail = null },
    fetchPageDetail: async (state, name) => {
      await Axios.get('/api/pages/' + name).then(response => {
        state.pageDetail = response.data
      })
    },

    // posts' overview
    clearPostsOverview: state => { state.postsOverview = null },
    fetchPostsOverview: async (state) => {
      await Axios.get('/api/posts/overview').then(response => {
        state.postsOverview = response.data
      })
    },

    // post
    clearPost: state => { state.postDetail = null },
    fetchPostDetail: async (state, id) => {
      await Axios.get('/api/posts/' + id).then(response => {
        state.postDetail = response.data
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
