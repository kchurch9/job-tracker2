import * as React from 'react'
import {Header, Grid, Menu, Segment, Table} from 'semantic-ui-react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './index.css'


export default class MenuTabularOnLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'students',
            students: [],
            companies: [],
            cohort:[],
            cohortClass:[]
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
            this.setState({cohort: res.data , students:res.data})
        })
    }
    organizeStudents() {
        this.state.students.sort((a, b) => a.lastName.localeCompare(b.lastName))
    }

    renderStudents() {
        if (this.state.activeItem ==='students'){
            return (
                <div>
                    <Header as="h2" className="column-header">Students</Header>
                    <Table.HeaderCell className='name'
                    onClick={this.organizeStudents()}>Name</Table.HeaderCell>
                    <Table.HeaderCell className='email'>Email</Table.HeaderCell>
                    <Table.HeaderCell className='cohort'>Cohort</Table.HeaderCell>
                    {this.state.students.map(s => {
                        return (
                            <div>
                                <Link to={`/applications/${s.userHandle}`} key={s.userHandle}>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{s.firstName}{s.lastName}</Table.Cell>
                                            <Table.Cell>{s.email}</Table.Cell>
                                            <Table.Cell>{s.cohort}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
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
                    <Table.HeaderCell className='cohort'>Cohort Name</Table.HeaderCell>
                    {this.state.cohort.map(b => {
                        return (
                            <Link to={`/admin/cohortClass${b.id}`} key={b.id}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{b.name}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            </Link>
                    )
                    })}

                </div>
            )

        }
    }
    renderCohortClass(){
        if (this.state.activeItem === 'cohortClass') {
            return (
                <div>
                    <Header as="h2" className="column-header">Cohort Class</Header>
                    <Table.HeaderCell className="cohort">Cohort Name</Table.HeaderCell>
                    <Table.HeaderCell className="lastName">Last Name</Table.HeaderCell>
                    {this.state.cohort.map(b => {
                        return(
                            <div key={b.id}>
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
                            onClick={this.handleItemClick}
                        />
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
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>
                        {this.renderStudents()}
                        {this.renderCompanies()}
                        {this.renderCohort()}
                        {this.renderCohortClass()}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}












