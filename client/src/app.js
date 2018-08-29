//TODOS create routes successful login
import * as React from 'react'
import axios from 'axios'
import { BrowserRouter , Route } from  'react-router-dom'
import Login from './login'
import NavBar from './navbar'
import './index.css'

const Home = () => <h2>Home</h2>
const Admin = () => <h2>Admin</h2>
const User = () => <h2>User</h2>

export default class App extends React.Component {
  
  render(){
    return(
      <div>
        <NavBar/>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/user" component={User}/>
        </div>
       </div>
    )
  }
}
