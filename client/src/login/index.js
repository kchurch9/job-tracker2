
import * as React from 'react'
import axios from 'axios'
import {Button,Input, Header, Modal,Form,} from 'semantic-ui-react'
import SignUpModal from './sign-up-modal'

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '' , 
      password: '', 
      isSuccess: false, 
      hasTriedToLogIn: false, 
      isSignUpModalOpen: false
    }
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
  handleSignupClick = (event) =>{
    event.preventDefault()
    this.setState({isSignUpModalOpen:true})
  }
  handleClose =(event) =>{
    this.setState({isSignUpModalOpen:false})
  }
  handleSignUpSubmit =(data) =>{
    console.log('sent', data)
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
          <div><Input onChange={this.handleEmailChange} placeholder="Email"/></div>
          <div><Input type="password" onChange={this.handlePasswordChange} placeholder="Password"/></div>
          <div> 
            <Button content="Log in" primary/>
            <Button content="Sign Up" secondary onClick={this.handleSignupClick}/>
          </div>
        </form>

        <SignUpModal isOpen={this.state.isSignUpModalOpen} onClose={this.handleClose} onSubmit={this.handleSignUpSubmit}/>
      </div>
    )
  }
}
