import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainLayout from "./MainLayout"


const Register = () => {

    //useState for Register Form
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        country: '',
        region: '',
        password: ''
    })

    //deconstruct user state for easy use
    const { firstName, lastName, email, gender, country, region, password } = user;

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/auth/register", user)
            .then((res) => {
                //res.data holds the object result of API
                console.log(`Response is: ${JSON.stringify(res.data)}`);
            })
            .catch((err) => {
                //err.reponse.data holds the object result of API
                console.log(`Error is: ${JSON.stringify(err.response.data)}`);
            });
    }

    return (
        <MainLayout>
            <h2 className="text-center mt-5">Register</h2>
            <Form onSubmit={handleSubmit} className="mt-3 w-50 mx-auto">
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicFirstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Firstname" name="firstName" value={firstName} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Lastname" name="lastName" value={lastName} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" placeholder="Enter Gender" name="gender" value={gender} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Enter Country" name="country" value={country} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicRegion">
                            <Form.Label>Region</Form.Label>
                            <Form.Control type="text" placeholder="Enter Region" name="region" value={region} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </MainLayout>
    )
}
export default Register
