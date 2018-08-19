import * as React from 'react'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {email: '' , password: ''}
  }
  handleClick = () => {
    const url = 'http://localhost:4001'
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(url,data)
  }
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange = (event) =>{
    this.setState({ password:event.target.value})
  }
  render() {
    return (
      <div>
        <form>
          <div><input type="text" onChange={this.handleEmailChange} placeholder="Email"/></div>
          <div><input type="password" onChange={this.handlePasswordChange} placeholder="Password"/></div>
          <div> <button onClick={this.handleClick} type="button">Click Here </button></div>
        </form>
      </div>
    )
  }
}


const event = {
  target: {
    value: 'asdfdsfsadsad'
  }
}