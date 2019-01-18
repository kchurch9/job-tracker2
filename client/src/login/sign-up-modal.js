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
          lastName: '',
          cohort: ''
        }
    }
    handleSignUpClick= ()=>{ 
        this.props.onSubmit(this.state)
        this.props.onClose()
    }
    handleChange = (event, field) => {
       this.setState({
           [field.name]: field.value
       })
    }
    onClick = () =>{
        this.setState({

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
                                    placeholder='Email'
                                    onChange={this.handleChange}
                                />

                            </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='password'
                                control={Input}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                name='confPassword'
                                control={Input}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                            <Form.Field>
                                <Input type= "cohortCode"
                                       name='cohort'
                                       placeholder='Cohort Code'
                                       onChange={this.handleChange}
                                />
                            </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' inverted content="Sign up" onClick={this.handleSignUpClick}/>
                    <Button content="Cancel" onClick={this.props.onClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}


