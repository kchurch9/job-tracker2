//TODOS create routes successful login
import * as React from 'react'
import axios from 'axios'
import { BrowserRouter , Route } from  'react-router-dom'
import Login from './login'
import NavBar from './navbar'
import './index.css'
import Applications from './applications'
import Admin from './admin'

const Home = () => <h2>Home</h2>

export default class App extends React.Component {
  
  render(){
    return(
      <div className="page">
        <NavBar/>
        <div className="page-body">
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/applications" component={Applications}/>
        </div>
       </div>
    )
  }
}
