import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import './index.css'
import {Button} from 'semantic-ui-react'
import ApplicationModal from './create-application-modal'
import NoteModal from './create-note-modal'
import axios from 'axios'
import {getApplicationWithNextStatus, getApplicationWithPreviousStatus} from './util'
import Navbar from './navbar'
import * as api from './api'

export default class Applications extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      applications:[],
      isSignUpModalOpen: false,
      isNoteModalOpen: false,
      openApp: null
    }
  }
  componentDidMount () {
    const userId = this.props.match.params.userId
    const url = `${process.env.API_HOST}/applications/${userId || ''}`
    axios.get(url).then(res =>{
     this.setState({applications:res.data})
    })
  }
  handleSignupClick = (event) =>{
    event.preventDefault()
    this.setState({isSignUpModalOpen:true})
  }
  handleNoteClick = (app) =>{
    this.setState({isNoteModalOpen:true , openApp:app})
  }
  handleClose = () =>{
    this.setState({isSignUpModalOpen:false , isNoteModalOpen:false})
  }
  handleCreateApplication = (data) =>{
    const url = `${process.env.API_HOST}/application`
    axios.post(url,data)
      .then(() =>{
        console.log("successful application upload")
      }) 
      .catch((err)=>{
        console.log("error",err)
      })    

  }

  handleUpdateNote = (note) =>{
   const updatedApplication = {...this.state.openApp, note: note}

    this.saveApplication(updatedApplication)
  }


  handleMoveCardBack = (id) => {
    const application = this.state.applications.find((app) => {
      return id === app.id
    })

    const updatedApplication = getApplicationWithPreviousStatus(application)

    const updatedApplications = this.state.applications.map( (app) => {
      if (id === app.id) {
        return updatedApplication
      } else {
        return app
      }
    })

    this.setState({applications: updatedApplications})
    this.saveApplication(updatedApplication)
  }

  handleMoveCardForward = (id) => {
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
    this.saveApplication(updatedApplication)
  }
  saveApplication = (updatedApplication) => {
    const url = `${process.env.API_HOST}/application`
    axios.put(url, updatedApplication)
  }
  onDelete = (id) => {
    api.deleteApplication(id)
  }
  applicationToCard = application => {
    const id = application.id
      return {
          header: application.companyName,
          description:(
            <div>
              <Button color='green' inverted content="<-" onClick={() => this.handleMoveCardBack(id)}/>
              <Button color='blue' inverted content="->" onClick={() => this.handleMoveCardForward(id)}/>
              <Button color='red' inverted content="X" onClick={() => this.onDelete(id)}/>
              <Button.Group basic size='small'>
                <Button icon='file' onClick={() => this.handleNoteClick(application)}/>
              </Button.Group>
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
          <Navbar/>
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
        <ApplicationModal isOpen={this.state.isSignUpModalOpen} onClose={this.handleClose} onSubmit={this.handleCreateApplication}/>
        <NoteModal isOpen={this.state.isNoteModalOpen} onClose={this.handleClose} onSubmit={this.handleUpdateNote}
                   app={this.state.openApp}/>

      </div>
       
    )
  }
}

