import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import './index.css'
import {Button,Input, Modal,Form,} from 'semantic-ui-react'
import ApplicationModal from './create-application-modal'
import axios from 'axios'
import {getApplicationWithNextStatus, getApplicationWithPreviousStatus} from './util'

export default class Applications extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      applications:[],
      isSignUpModalOpen: false
    }
  }
  componentDidMount () {
    const url = 'http://localhost:4001/applications'
    axios.get(url).then(res =>{
     this.setState({applications:res.data})
    })
  }
  handleSignupClick = (event) =>{
    event.preventDefault()
    this.setState({isSignUpModalOpen:true})
  }
  handleClose = () =>{
    this.setState({isSignUpModalOpen:false})
  }
  handleSignUpSubmit = (data) =>{
    const url = 'http://localhost:4001/application'
    axios.post(url,data)
      .then(res =>{
        console.log("successful application upload")
      }) 
      .catch((err)=>{
        console.log("error",err)
      })    

  }
  
  getCardBackHandler = (id) => () => {
    const updatedApplications = this.state.applications.map( (app) => {
      if (id===app.id){
        return getApplicationWithPreviousStatus(app)
      }
      else {
        return app
      }
    })
    
    this.setState({applications:updatedApplications})

  }
  getCardForwardHandler = (id) => () => {
    const application = this.state.applications.find((app) => {
      return id === app.id
    })
    
    const updatedApplication = getApplicationWithNextStatus(application)

    const updatedApplications = this.state.applications.map( (app) => {
      if (id===app.id){
        return updatedApplication
      }
      else {
       return app
      }
    })
  
    this.setState({applications:updatedApplications})
    
    const url = 'http://localhost:4001/application'
    axios.put(url, updatedApplication)//put is http verb to update data that already exists
  }
  
  applicationToCard = application => {
    const id = application.id
      return {
          header: application.companyName,
          description:(
            <div>
              <Button color='green' inverted content="Back" onClick={this.getCardBackHandler(id)}/>
              <Button color='blue' inverted content="Forward" onClick={this.getCardForwardHandler(id)}/>
            </div>
          ),
          meta: application.position,
          key: id
      }
  }

  getCardsByStatus(status) {
    return this.state.applications
      .filter(application => application.status === status )
      .map(this.applicationToCard)
    
  }
  render() {
      const interestApplications = this.getCardsByStatus('Interested')
      const appliedApplications = this.getCardsByStatus('Applied')
      const phoneInterview = this.getCardsByStatus('Phone Interview')
      const interview = this.getCardsByStatus('Interview')
      const results = this.getCardsByStatus('Results')
       
    return (
      <div>
        <div>
          <Button content="Create Application" onClick={this.handleSignupClick}/>
          <div className="columns-list"> 
            <div className="column">
              <Header as="h2" className="column-header">Interested</Header>
              <Card.Group items={interestApplications} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Applied</Header>
              <Card.Group items={appliedApplications} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Phone Interview</Header>
              <Card.Group items={phoneInterview} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Interview</Header>
              <Card.Group items={interview} itemsPerRow={1}/>
            </div>
            <div className="column">
              <Header as="h2" className="column-header">Results</Header>
              <Card.Group items={results} itemsPerRow={1}/>
            </div>
          </div>
        </div>
        <ApplicationModal isOpen={this.state.isSignUpModalOpen} onClose={this.handleClose} onSubmit={this.handleSignUpSubmit}/>
       </div> 
       
    )
  }
}

