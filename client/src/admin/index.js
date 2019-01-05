import * as React from 'react'
import {Header, Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios'

export default class MenuExampleTabularOnLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'students',
            students: [],
            companies: []
        }
    }

    componentDidMount() {
      this.fetchStudents()
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
        if (name === 'students') {
           this.fetchStudents()
        }
        else if (name ==='companies') {
            this.fetchCompanies()
        }

    }
    fetchStudents(){
        axios.get('http://localhost:4001/students').then(res => {
            this.setState({students: res.data})
        })
    }
    fetchCompanies(){
        axios.get('http://localhost:4001/companies').then(res => {
            this.setState({companies: res.data})
        })
    }

    renderStudents() {
        if (this.state.activeItem ==='students'){
            return (
                <div>
                    <Header as="h2" className="column-header">Students</Header>
                    {this.state.students.map(s => {
                        return (
                            <div key={s.userHandle}>
                                {s.firstName} {s.lastName} {s.email}
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    renderCompanies() {
        if (this.state.activeItem === 'companies') {
            return (
                <div>
                    <Header as="h2" className="column-header">Companies</Header>
                    {this.state.companies.map(c => {
                        return (
                            <div key={c.id}>
                                {c.companyName}
                            </div>
                        )
                    })}

                </div>
            )

        }
    }
    render() {
        const activeItem = this.state.activeItem

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name='students' active={activeItem === 'students'} onClick={this.handleItemClick}/>
                        <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick}/>
                        <Menu.Item
                            name='companies'
                            active={activeItem === 'companies'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='links'
                            active={activeItem === 'links'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>
                        {this.renderStudents()}
                        {this.renderCompanies()}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}












