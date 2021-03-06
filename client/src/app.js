import * as React from 'react'
import { Route } from  'react-router-dom'
import Login from './login'
import './index.css'
import Applications from './applications'
import Admin from './admin'


export default class App extends React.Component {
  
  render(){
    return(
      <div className="page">

        <div className="page-body">
          <Route exact path="/" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/applications/:userId?" component={Applications}/>
        </div>
       </div>
    )
  }
}
