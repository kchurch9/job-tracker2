import * as React from 'react'
import {Button,Input, Header, Modal,Form,} from 'semantic-ui-react'

export default class SignUpModal extends React.Component {
    handleSignUpClick= ()=>{ 
        const data={
            firstName:'asdfjnoji',
            lastName:'asdf'
        } 
        this.props.onSubmit(data)
    }
    render() {
        return (
            <Modal open={this.props.isOpen} onClose={this.props.onClose}> 
              <Header content='Sign up'/>
              <Modal.Content>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field
                      control={Input}
                      placeholder='First name'
                    />
                    <Form.Field
                      control={Input}
                      placeholder='Last Name'
                    />
                  </Form.Group>
                  <Form.Field>
                    <Input placeholder="Email"/> 
                   </Form.Field>
                   <Form.Field>
                   <Input placeholder="Password"/> 
                   <Input placeholder="Confirm Password"/> 
                   </Form.Field> 
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color='blue' inverted content="Sign up" onClick={this.handleSignUpClick}/>
                <Button content="Cancel" onClick ={this.props.onClose}/>
              </Modal.Actions>      
            </Modal>
        )
    }
}