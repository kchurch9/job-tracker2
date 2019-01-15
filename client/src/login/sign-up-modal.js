import * as React from 'react'
import {Button,Input, Header, Modal,Form,} from 'semantic-ui-react'

export default class SignUpModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          email: '' , 
          password: '', 
          confPassword: '',
          firstName: '',
          lastName: ''
        }
    }
    handleSignUpClick= ()=>{ 
        this.props.onSubmit(this.state)
    }
    handleChange = (event, field) => {
       this.setState({
           [field.name]: field.value
       })
    }

    render() {
        return (
            <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                <Header content='Sign up' />
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='firstName'
                                control={Input}
                                placeholder='First name'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                name='lastName'
                                control={Input}
                                placeholder='Last Name'
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                            <Input
                                name='email'
                                placeholder="Email"
                                onChange={this.handleChange}
                            />

                        </Form.Field>
                        <Form.Field>
                            <Input type= "password"
                                name='password'
                                placeholder="Password" 
                                onChange={this.handleChange} 
                            />
                            <Input type= "password"
                                name="confPassword"
                                placeholder="Confirm Password" 
                                onChange={this.handleChange} 
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' inverted content="Sign up" onClick={this.handleSignUpClick && this.props.onClose}/>
                    <Button content="Cancel" onClick={this.props.onClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}


