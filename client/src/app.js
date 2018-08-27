//TODOS create routes successful login
import * as React from 'react'
import axios from 'axios'
import { BrowserRouter , Route } from  'react-router-dom'

const Home = () => <h2>Home</h2>
const Admin = () => <h2>Admin</h2>
const User = () => <h2>User</h2>

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {email: '' , password: '', isSuccess: false, hasTriedToLogIn: false }
    }
  handleClick = () => {
    const url = 'http://localhost:4001/login'
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(url,data)
      .then(res =>{
        console.log('status:',res.status)
        this.setState({isSuccess:true, hasTriedToLogIn:true})
      })
      .catch(err=>{
        console.log('error:',err.response.status)
        this.setState({isSuccess:false, hasTriedToLogIn:true})
      })
      
  }
  render() { 
    return(
     <div>
      <BrowserRouter>
        <div>
          <Route exact path ='/' component={Home}/>
          <Route exact path ='/adminlanding' component={Admin}/>
          <Route exact path ='/userlanding' component={User}/>
        </div>
      </BrowserRouter>
     </div>
  )
}

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange = (event) =>{
    this.setState({ password: event.target.value })
  }
  render() {
    let logginMessage=''
    if (this.state.hasTriedToLogIn){
      if(this.state.isSuccess){
        logginMessage='Granted'
      } else {
        logginMessage="Denied"
      }
    }
    return (
      <div>
        <form>
          <div>{logginMessage}</div> 
          <div><input type="text" onChange={this.handleEmailChange} placeholder="Email"/></div>
          <div><input type="password" onChange={this.handlePasswordChange} placeholder="Password"/></div>
          <div> <button onClick={this.handleClick} type="button">Click Here </button></div>
        </form>
      </div>
    )
  }
}
