import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <Menu inverted>
                <Menu.Item as='div' name='logout' active={window.location.pathname === '/'}>
                    <Link to='/'>Logout</Link>
                </Menu.Item>
            </Menu>
        )
    }
}