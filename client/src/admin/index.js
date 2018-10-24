
import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import {Button,Input,Form,} from 'semantic-ui-react'
import axios from 'axios'

export default class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          user:[],
          isSignUpModalOpen: false
        } 
      }
      componentDidMount () {
        const url = 'http://localhost:4001/admin'
        axios.get(url).then(res =>{
         this.setState({admin:res.data})
        })
      }
      userToCard = user => {
        const id = user.id
          return {
              header: user.lastName,
              description:user.firstName,
              meta: user.email,
              key: id
          }
      }
    
      getCardsByStatus(user) {
        return this.state.user
          .map(this.userToCard)
        
      }
      render() {
          const userList = this.getCardsByStatus('user')
        
      return (
          <div>
            <div>
              <div className="columns-list"> 
                <div className="column">
                  <Header as="h2" className="column-header">Students</Header>
                  <Card.Group items={userList} itemsPerRow={1}/>
                </div>
                
              </div>
            </div>
         
           </div> 
           
        )
      }
    }
    
    