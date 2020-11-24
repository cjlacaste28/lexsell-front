import React, { useState } from 'react'
import MainLayout from "./MainLayout"
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'

const Login = () => {

    //useState for Login Form
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    //deconstruct loginInfo state for easy use
    const { email, password } = loginInfo;

    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/auth/login", loginInfo)
            .then((res) => {
                //res.data holds the object result of API
                console.log(`Response is: ${JSON.stringify(res.data)}`);
            })
            .catch((err) => {
                //err.reponse.data holds the object result of API
                console.log(`Error is: ${JSON.stringify(err.response.data)}`);
            });
    }

    const responseSuccessGoogle = (res) => {
        console.log(res);
        //storing the tokenId from google response.
        const user = { tokenId: res.tokenId }
        axios.post("http://localhost:5000/api/auth/googleLogin", user)
            .then((res) => {
                //res.data holds the object result of API
                console.log(`Google Login Response is: ${JSON.stringify(res.data)}`);
            })
            .catch((err) => {
                //err.reponse.data holds the object result of API
                console.log(`Error is: ${JSON.stringify(err.response.data)}`);
            });

    }

    const responseErrorGoogle = (res) => {
        console.log(res);
    }

    return (
        <MainLayout>
            <div className="mt-4 text-center">
                <h4 className="mb-4">Login with Google</h4>

                <Form onSubmit={handleSubmit} className="mt-4 mb-4 w-50 mx-auto">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <GoogleLogin
                    clientId="999962597242-3rbqhpsghmjo9bk3ouihcdr6u3ddqegq.apps.googleusercontent.com"
                    buttonText="Login via Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'
                    }
                />
            </div>
        </MainLayout>
    )
}

export default Login
