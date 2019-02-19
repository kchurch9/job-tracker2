
import * as React from 'react'
import axios from 'axios'
import {Button,Input, Header, Modal,Form,} from 'semantic-ui-react'
import SignUpModal from './sign-up-modal'
import './index.css'

axios.defaults.headers.common['x-access-token']=localStorage.getItem('jwt')
//authorized request wrapping for whole application like a cookie
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
    console.log('test')
    event.preventDefault()
    const url = `${process.env.API_HOST}/login`
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(url,data)
      .then(res =>{
        console.log('status:',res.status)
        this.setState({isSuccess:true, hasTriedToLogIn:true})
        localStorage.setItem('jwt', res.data.token)
        axios.defaults.headers.common['x-access-token']=res.data.token
        if(res.data.user.isAdmin ){
            console.log('Is Admin')
            this.props.history.push('/admin')

        }
        else{
            console.log('is not admin')
            this.props.history.push('/applications')
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
    const url = `${process.env.API_HOST}/user`
    axios.post(url,data)
      .then(res =>{
        console.log("successful user")
      }) 
      .catch((err)=>{
        console.log("error",err)
      })    

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
          <h1 className= "ui center aligned header">Job Tracker</h1>
          <h3 className="ui center aligned header"> Log-in to your
              account</h3>
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
