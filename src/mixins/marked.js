import { marked } from 'marked'

export default {
  methods: {
    markdown(input) {
      return marked(input)
    }
  }
}
