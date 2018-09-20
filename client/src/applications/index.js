import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import './index.css'
import {Button,Input, Modal,Form,} from 'semantic-ui-react'
import ApplicationModal from './create-application-modal'

export default class Applications extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isSignUpModalOpen: false
    }
  }
  handleSignupClick = (event) =>{
    event.preventDefault()
    this.setState({isSignUpModalOpen:true})
  }
  handleClose =(event) =>{
    this.setState({isSignUpModalOpen:false})
  }
  handleSignUpSubmit =(data) =>{
    const url = 'http://localhost:4001/user'
    axios.post(url,data)
      .then(res =>{
        console.log("successful user")
      }) 
      .catch((err)=>{
        console.log("error",err)
      })    

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Button content="Create Application" onClick={this.handleSignupClick}/>
          </div>
          <ApplicationModal isOpen={this.state.isSignUpModalOpen} onClose={this.handleClose} onSubmit={this.handleSignUpSubmit}/>
        </form>
       </div> 
       
    )
  }
}
