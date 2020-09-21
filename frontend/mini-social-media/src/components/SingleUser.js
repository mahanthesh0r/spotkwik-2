import React, { Component } from 'react'
import Navbar from './Navbars';
import {Card, CardTitle, Container, Row, Col, Button, CardText} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'


export default class SingleUser extends Component {
        constructor(props){
            super();

            this.state = {
                payload: "",
                count: 0,
                users: [],
                friends: [],
                h1: []
            }
        }
        
        componentDidMount(){
            
            const id = this.props.match.params.id
            axios.get('http://localhost:8000/user/'+id)
            .then(res => {
                this.setState({payload: res.data[0]})
            })

            axios.get('http://localhost:8000/user/'+id+'/friendcount')
            .then(response => {
                this.setState({count: response.data[0].count})
            })

            axios.get('http://localhost:8000/users/')
            .then(res => {
                this.setState({users: res.data})
                console.log(this.state.users)
            })

            axios.get('http://localhost:8000/user/'+id+'/friends')
            .then(res => {
                this.setState({friends: res.data})
                console.log(this.state.friends)
            })

            axios.get('http://localhost:8000/user/'+id+'/get-h1')
            .then(res => {
               this.setState({h1: res.data});
               console.log(this.state.h1)
            })

            //this.scrapeH1();
            
        }

        addFriend = (f_id) => {
            const id = this.props.match.params.id;
            axios.get('http://localhost:8000/user/'+id+'/friendship/'+f_id)
            .then(res => {
                console.log(res)
                
            })
            window.location.reload();
        }

        scrapeH1 = () => {
            const id = this.props.match.params.id;
            axios.get('http://localhost:8000/user/'+id+'/h1')
            .then(res => {
                console.log(res)
            })
        }


    render() {
        
        return (
            <div>
                <Navbar />
                <Container className="m-5">
                   <Card className="p-3">
                    <Row>
                        <Col>
                        <CardTitle>Name: <h5>{this.state.payload.name}</h5></CardTitle> 
                        <CardTitle>Website: <h5>{this.state.payload.url}</h5></CardTitle>
                        <CardTitle>Short URL: <h5>{this.state.payload.short_url}</h5></CardTitle>
                        <CardTitle>Friends: <h5>{this.state.count}</h5></CardTitle>
                        </Col>
                        <Col md="3">
                        <h5>Friend's List</h5>
                        {this.state.friends.map((payload, index) => {
                            return(
                                <React.Fragment key={index}>
                                    <Row>
                                        <Link to={'/user/'+payload.friend_id}>
                                        <CardText >{payload.name}</CardText>
                                        
                                       
                                        </Link>
                                    </Row>
                                </React.Fragment>
                            )
                        })}
                        </Col>
                        <Col>
                        <h5>H1</h5>
                        {this.state.h1.map((payload, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ul>
                                        <li>{payload.heading}</li>
                                    </ul>
                                </React.Fragment>
                            )
                        })}
                        
                        
                        </Col>
                        <Col>
                        <h5>H2</h5>
                        
                        </Col>
                        <Col>
                        <h5>H3</h5>
                        
                        </Col>
                    </Row>
                   </Card>
                    <hr />
                     <h2>Add Friends to {this.state.payload.name}</h2>
                     {this.state.users.map((payload,index) => {
                         return(
                         <React.Fragment key={index}>
                             <Row>
                             <Col md="2">
                             {payload.name}
                             </Col>
                             <Col md="2" className="mt-2"> 
                             <Button className="primary" onClick={()=> this.addFriend(payload.id)}> Add Friend</Button>
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
