import { marked } from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

export default {
  created() {
    // modified from https://gist.github.com/tajpure/47c65cf72c44cb16f3a5df0ebc045f2f
    const renderer = new marked.Renderer()
    let originParagraph = renderer.paragraph.bind(renderer)
    renderer.paragraph = (text) => {
      // eslint-disable-next-line
      const blockRegex = /\$\$[^\$]*\$\$/g
      // eslint-disable-next-line
      const inlineRegex = /\$[^\$]*\$/g
      let blockExprArray = text.match(blockRegex)
      let inlineExprArray = text.match(inlineRegex)
      for (let i in blockExprArray) {
        const expr = blockExprArray[i]
        const result = renderMathsExpression("$$\\displaystyle " + expr.substr(2))
        text = text.replace(expr, result)
      }
      for (let i in inlineExprArray) {
        const expr = inlineExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
      }
      return originParagraph(text)
    }
    function renderMathsExpression(expr) {
      if (expr[0] === '$' && expr[expr.length - 1] === '$') {
        let displayStyle = false
        expr = expr.substr(1, expr.length - 2)
        if (expr[0] === '$' && expr[expr.length - 1] === '$') {
          displayStyle = true
          expr = expr.substr(1, expr.length - 2)
        }
        let html = null
        try {
          html = katex.renderToString(expr)
        } catch (e) {
          console.err(e)
        }
        if (displayStyle && html) {
          html = html.replace(/class="katex"/g, 'class="katex katex-block" style="display: block;"')
        }
        return html
      } else {
        return null
      }
    }
    marked.setOptions({
      renderer: renderer,
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  },
  methods: {
    markdown(input) {
      return marked(input)
    }
  }
}
