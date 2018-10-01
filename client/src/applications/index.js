import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import './index.css'
import {Button,Input, Modal,Form,} from 'semantic-ui-react'
import ApplicationModal from './create-application-modal'
import axios from 'axios'

const items = [
  {
    header: 'Adobe',
    meta: 'Front-end devloper, 8-10-2018',
    key: '1'
  },
  {
    header: 'Adobe',
    meta: 'back-end dev, 8-11-2018',
    key:'2'

  }
]

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
    const url = 'http://localhost:4001/application'
    axios.post(url,data)
      .then(res =>{
        console.log("successful application upload")
      }) 
      .catch((err)=>{
        console.log("error",err)
      })    

  }
  render() {
    return (
      <div>
        <div>
          <Button content="Create Application" onClick={this.handleSignupClick}/>
          <div className="columns"> 
            <div className="column">
              <Header as="h2" className="column-header">Interest</Header>
              <Card.Group items={items} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Applied</Header>
              <Card.Group items={items} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Phone Interview</Header>
              <Card.Group items={items} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Interview</Header>
              <Card.Group items={items} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Results</Header>
              <Card.Group items={items} itemsPerRow={1}/>
            </div>
          </div>
        </div>
        <ApplicationModal isOpen={this.state.isSignUpModalOpen} onClose={this.handleClose} onSubmit={this.handleSignUpSubmit}/>
       </div> 
       
    )
  }
}
