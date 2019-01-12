import * as React from 'react'
import {Button,Header, Modal,Form,TextArea} from 'semantic-ui-react'


export default class NoteModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            note: null
        }
    }
    handleSubmitClick= ()=>{
        this.props.onSubmit(this.state.note)
    }
    handleChange = (event, field) => {
        this.setState({
            [field.name]: field.value
        })
    }
    getNote = () => {
        if (this.state.note !== null)
            return this.state.note
        return this.props.app ? this.props.app.note : ''


    }
    render() {
        return (
            <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                <Header content='Job Applications Note' />
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={TextArea}
                                name='note'
                                label='Company Information & other note'
                                placeholder='Please include phone numbers and location of company'
                                onChange={this.handleChange}
                                value={this.getNote()}
                             />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='upload' color='blue' inverted content="Submit" onClick={this.handleSubmitClick}/>
                    <Button content="Cancel" onClick={this.props.onClose}/>
                </Modal.Actions>
            </Modal>
        )
    }
}