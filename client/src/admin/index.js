import * as React from 'react'
import {Header, Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class MenuTabularOnLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'students',
            students: [],
            companies: [],
            cohort:[]
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
        else if (name ==='cohort') {
            this.fetchCohort()
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
    fetchCohort(){
        axios.get('http://localhost:4001/cohort').then(res => {
            this.setState({cohort: res.data})
        })
    }
    renderStudents() {
        if (this.state.activeItem ==='students'){
            return (
                <div>
                    <Header as="h2" className="column-header">Students</Header>
                    {this.state.students.map(s => {
                        return (
                            <div>
                                <Link to={`/applications/${s.userHandle}`} key={s.userHandle}>
                                    {s.firstName} {s.lastName} {s.email} {s.cohort}
                                </Link>
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
                        console.log()
                        return (
                            <div key={c.id}>
                                {c.company_name}
                            </div>
                        )
                    })}

                </div>
            )

        }
    }
    renderCohort() {
        if (this.state.activeItem === 'cohort') {
            return (
                <div>
                    <Header as="h2" className="column-header">Cohorts</Header>
                    {this.state.cohort.map(b => {
                        console.log()
                        return (
                            <div key={b.cohort}>
                                {b.name}
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
                        <Menu.Item
                            name='students'
                            active={activeItem === 'students'}
                            onClick={this.handleItemClick}/>
                        <Menu.Item
                            name='cohort'
                            active={activeItem === 'cohort'}
                            onClick={this.handleItemClick}
                        />
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
                        {this.renderCohort()}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}












