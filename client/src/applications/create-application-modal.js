import * as React from 'react'
import {Button,Input, Header, Modal,Form,} from 'semantic-ui-react'

export default class ApplicationModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          position: '' , 
          company: '', 
          date: ''
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
                <Header content='Create Job Application' />
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='position'
                                control={Input}
                                placeholder='Position'
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                name='company'
                                control={Input}
                                placeholder='Company'
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                            <Input
                                name='date'
                                placeholder="Date"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' inverted content="Submit" onClick={this.handleSignUpClick}/>
                    <Button content="Cancel" onClick={this.props.onClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}


