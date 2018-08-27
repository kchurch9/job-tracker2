//TODOS create routes successful login
import * as React from 'react'
import axios from 'axios'


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {email: '' , password: '', isSuccess: false, hasTriedToLogIn: false }
    }
  handleSubmit = (event) => {
    event.preventDefault()
    const url = 'http://localhost:4001/login'
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(url,data)
      .then(res =>{
        console.log('status:',res.status)
        this.setState({isSuccess:true, hasTriedToLogIn:true})
        if(res.data.isAdmin ){
            console.log('Is Admin')
            this.props.history.push('/admin')

        }
        else{
            // send to user page
            console.log('is not admin')
            this.props.history.push('/user')
        }
        
      })
      .catch(err=>{
        console.log('error:',err)
        this.setState({isSuccess:false, hasTriedToLogIn:true})
      })
      
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
        <form onSubmit={this.handleSubmit}>
          <div>{logginMessage}</div> 
          <div><input type="text" onChange={this.handleEmailChange} placeholder="Email"/></div>
          <div><input type="password" onChange={this.handlePasswordChange} placeholder="Password"/></div>
          <div> <button type="submit">Click Here</button></div>
        </form>
      </div>
    )
  }
}
