import * as React from 'react'
import { Header } from  'semantic-ui-react'
import axios from 'axios'

export default class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          students:[]
        } 
      }
      componentDidMount () {
        const url = 'http://localhost:4001/students'
        axios.get(url).then(res =>{
         this.setState({students:res.data})
        })
      }
      render() {
        return (
          <div>
            <div>
              <div className="columns-list"> 
                <div className="column">
                  <Header as="h2" className="column-header">Students</Header>
                  {this.state.students.map(s =>{
                    return (
                      <div key={s.userHandle}>
                        {s.firstName} {s.lastName} {s.email}
                        
                      </div>
                    )
                  })}
                </div>
                
              </div>
            </div>
         
           </div> 
           
        )
      }
    }
    
    