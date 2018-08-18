
import * as React from 'react'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div><input type="text" placeholder="Name"/></div>
          <div><input type="password" placeholder="Password"/></div>
          <div> <button type="button">Click Here </button></div>
        </form>
      </div>
    )
  }
}
