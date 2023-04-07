import react from 'react'
import { Link } from 'react-router-dom'
import htm from 'htm'

const html = htm.bind(react.createElement)

export class Header extends react.Component {
  render() {
    return html`
      <h1>
        <${Link} to="/">My Library</>
      </h1>
    `
  }
}