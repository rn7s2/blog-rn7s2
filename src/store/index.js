import { createStore } from 'vuex'
import Axios from 'axios'

export default createStore({
  state: {
    pages: [],
    pageDetail: null,
    postsOverview: null,
    postDetail: null
  },
  getters: {
  },
  mutations: {
    setPages: (state, pages) => { state.pages = pages },

    clearPage: state => { state.pageDetail = null },
    fetchPageDetail: async (state, name) => {
      // in the future, get /api/pages/:name
      await Axios.get('/pages/' + name + '.json').then(response => {
        state.pageDetail = response.data
      })
    },

    clearPostsOverview: state => { state.postsOverview = null },
    fetchPostsOverview: async (state) => {
      // in the future, get /api/posts/overview
      await Axios.get('/posts/overview.json').then(response => {
        state.postsOverview = response.data
      })
    },

    clearPost: state => { state.postDetail = null },
    fetchPostDetail: async (state, id) => {
      // in the future, get /api/posts/:id
      await Axios.get('/posts/' + id + '.json').then(response => {
        state.postDetail = response.data
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
