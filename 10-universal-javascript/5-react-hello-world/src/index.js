import react from 'react'
import ReactDOM from 'react-dom'

const h = react.createElement

class Hello extends react.Component {
  render() {
    return h('h1', null, [
      'Hello',
      this.props.name || 'world'
    ])
  }
}

ReactDOM.render(
  h(Hello, { name: 'React' }),
  document.getElementsByTagName('body')[0]
)