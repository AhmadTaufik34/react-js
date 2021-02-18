import React, { Fragment, useContext, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, CardImg } from 'reactstrap';

import { AuthContext } from '../App'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';
const qs = require('querystring')
const api = "http://localhost:3001"

var Recaptcha = require('react-recaptcha');

function LoginComp(props) {

    const { dispatch } = useContext(AuthContext)

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const stateForm = {
        email: "",
        password: "",
    }

    const [data, setData] = useState(initialState)
    const [dataform, setDataForm] = useState(stateForm)

    // specifying your onload callback function
    var callback = function () {
        console.log('Done!!!!');
    };

    // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if (response) {
            setData({
                ...data,
                isVerified: true
            })
        }
    };

    const handleInputChange = event => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        if (data.isVerified) {
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })

            const requestBody = {
                email: dataform.email,
                password: dataform.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true && res.data.isVerified === 1) {
                        dispatch({
                            type: "LOGIN",
                            payload: res.data
                        })

                        //redirect ke dashboard
                        props.history.push("/dashboard")
                    }
                    else if(res.data.success === true && res.data.isVerified === 0){
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Email Anda belum terverifikasi, silahkan cek email"
                        })
                    }
                    else {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: res.data.Message
                        })
                    }

                    throw res
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else{
            alert('Anda diduga robot')
        }

    }

    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg width="100%" src="https://placeimg.com/640/480/nature" />
                    </Col>
                    <Col>
                    <h1>Form Login</h1>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email"
                                    value={dataform.email}
                                    onChange={handleInputChange}
                                    name="email" id="exampleEmail"
                                    placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password"
                                    value={dataform.password}
                                    onChange={handleInputChange}
                                    name="password" id="examplePassword" placeholder="password placeholder" />
                            </FormGroup>
                            <Recaptcha
                                sitekey="6LceqFoaAAAAACYbAwa5vuM3Gg2U2gN_9LKXNsDG"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />,
                            <br />

                            {data.errorMessage && (
                                <div className="alert alert-danger" roel="alert">
                                    {data.errorMessage}
                                </div>
                            )}

                            <Button disables={data.isSubmitting}>
                                {data.isSubmitting ? (
                                    "Loading.."
                                ) :
                                    (
                                        "Login"
                                    )
                                }
                            </Button>
                        </Form>
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default LoginComp
