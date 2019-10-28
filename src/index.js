import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import GameAppBuilder from './components/GameApp.js'
import './index.css'

ReactDOM.render(
  <Router>
      <GameAppBuilder />
  </Router>
  , document.getElementById('root'))