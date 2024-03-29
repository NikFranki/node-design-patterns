import react from 'react'
import { Link } from 'react-router-dom'
import htm from 'htm'

import { Header } from '../Header.js'

const html = htm.bind(react.createElement)

export class FourOhFour extends react.Component {
  render() {
    // ssr 渲染的组件，所以需要设置状态码
    if (this.props.staticCotext) {
      this.props.staticCotext.statusCode = 404
    }

    return html`<div>
      <${Header} />
      <div>
        <h2>404</h2>
        <h3>${this.props.error || 'Page not found'}</h3>
        <${Link} to="/">Go back to the home page</>
      </div>
    </div>`
  }
}