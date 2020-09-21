import React, { Component } from 'react'
import Navbar from './Navbars'
import {Row, Col, Container} from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor(props){
    super();
    this.state = {
        payloads: [],

    }
    }
    componentDidMount(){
        fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                const data = result
                this.setState({ payloads: data}, ()=> {
                    console.log(this.state.payloads)
                })
            }
        )
    }


    render() {
        return (
            <div>
                <Navbar />
                <Container className="mt-5">
                <Row>
                    <Col md="3">
                    <h6>NAME</h6>
                    </Col>
                    <Col md="3">
                    <h6>URL</h6>
                    </Col>
                    <Col md="3">
                    <h6>SHORT_URL</h6>
                    </Col>
                </Row>
                {this.state.payloads.map((payload, index) => {
                    return(
                        <React.Fragment key={index}>
                            <Row>
                    
                                <Col md="2" className="mt-2">
                                    <Link to={'/user/'+payload.id}>
                                <p>{payload.name}</p>
                                </Link>
                                </Col>

                                <Col md="4" className="mt-2">
                                <p>{payload.url}</p>
                                </Col>

                                <Col md="3" className="mt-2">
                                <p>{payload.short_url}</p>
                                </Col>

                            </Row>
                        </React.Fragment>
                    )
                })}
                </Container>
                
            </div>
        )
    }
}
