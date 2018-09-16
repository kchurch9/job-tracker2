import * as React from 'react'
import { Card, Header } from  'semantic-ui-react'
import './index.css'
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
  render() {
    return (
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
    )
  }
}
