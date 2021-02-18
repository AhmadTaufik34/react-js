import React, { Fragment, useContext, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, CardImg } from 'reactstrap';

// import { AuthContext } from '../App'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';
const qs = require('querystring')
const api = "http://localhost:3001"

var Recaptcha = require('react-recaptcha');

function RegisterComp(props) {

    // const { dispatch } = useContext(AuthContext)

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const stateForm = {
        username: "",
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
                username: dataform.username,
                email: dataform.email,
                password: dataform.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(api + '/auth/api/v1/register', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true && res.data.isRegistered === false) {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Silahkan Cek E-Mail untuk Verifikasi"
                        })

                        setDataForm({
                            ...dataform,
                            username: "",
                            email: "",
                            password: ""
                        })


                    }
                    else if (res.data.success === false && res.data.isRegistered === true) {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Email Anda Telah Terdaftar"
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
        else {
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
                    <Col><h1>Form Register</h1>
                        <hr />
                        <FormGroup>
                            {data.errorMessage && (
                                <div className="alert alert-success" roel="alert">
                                    {data.errorMessage}
                                </div>
                            )}
                        </FormGroup>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input type="text"
                                    value={dataform.username}
                                    onChange={handleInputChange}
                                    name="username" placeholder="Masukkan Username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email"
                                    value={dataform.email}
                                    onChange={handleInputChange}
                                    name="email" placeholder="Masukkan E-Mail" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password"
                                    value={dataform.password}
                                    onChange={handleInputChange}
                                    name="password" placeholder="Masukkan Password" />
                            </FormGroup>
                            <FormGroup>
                                <Recaptcha
                                    sitekey="6LceqFoaAAAAACYbAwa5vuM3Gg2U2gN_9LKXNsDG"
                                    render="explicit"
                                    verifyCallback={verifyCallback}
                                    onloadCallback={callback}
                                />
                            </FormGroup>
                            <Button disables={data.isSubmitting}>
                                {data.isSubmitting ? (
                                    "Loading.."
                                ) :
                                    (
                                        "Register"
                                    )
                                }
                            </Button>
                        </Form>
                        <p>Sudah punya akun? <Link to="/login">Login</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default RegisterComp
