import react from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App.js'

const html = htm.bind(react.createElement)

ReactDOM.render(
  html`<${BrowserRouter}><${App} /></>`,
  document.getElementById('root')
)