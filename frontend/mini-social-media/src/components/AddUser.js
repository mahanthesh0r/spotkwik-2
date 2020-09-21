import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Navbar from './Navbars';



export default class AddUser extends Component {
    constructor(props) {
        super();
        this.state = {
            name: " ",
            url: " "
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.name)
        console.log(this.state.url)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name, url: this.state.url })
        };
        fetch('http://localhost:8000/add', requestOptions)
            .then(response => response.json())
            window.location.reload();
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleChangeURL = (event) => {
        this.setState({ url: event.target.value })
    }

    render() {
        return (
            <div>
                <Navbar />
                <Container className="m-5">
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input type="text" value={this.state.name} onChange={this.handleChangeName} id="exampleEmail" placeholder="Enter Name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="examplePassword">Website URL</Label>
                                    <Input type="text" value={this.state.url} onChange={this.handleChangeURL} id="examplePassword" placeholder="Enter URL" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit">Add</Button>
                    </Form>
                </Container>

            </div>
        )
    }
}
