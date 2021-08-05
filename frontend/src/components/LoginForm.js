import React, { useState, useEffect } from 'react'
import { Form, Button, Icon } from "semantic-ui-react"
import { useFormik, validateYupSchema } from "formik"
import * as Yup from 'yup'
import { LOGIN } from "../gql/user";
import { useQuery, useLazyQuery } from '@apollo/client';
import { setId } from '../utils/id'
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
    const [userLogin, { loading, data, error }] = useLazyQuery(LOGIN);
    const [state, setstate] = useState(false)
    const [errorLogin, setErrorLogin] = useState("")

    const { setUser } = useAuth();

    if (data && state) {
        setstate(false)
        if (data.userLogin == null) {
            setErrorLogin("Usuario y/o contraseña incorrectos")
        } else {
            setErrorLogin("")
            console.log(data.userLogin[0].id)
            const { id } = data.userLogin[0]
            setId(id)
            setUser(id)
        }
    }
    if (error && state) {
        setstate(false)
        setErrorLogin("Usuario y/o contraseña incorrectos")
        console.log(error)
    }

    const formik = useFormik({
        initialValues: {
            user: "",
            password: ""
        },
        validationSchema: Yup.object({
            user: Yup.string().required("Obligatorio"),
            password: Yup.string().required("Obligatorio")
        }),
        onSubmit: async (formData) => {
            const newLogin = formData;

            await userLogin({
                variables: {
                    user: newLogin.user,
                    password: newLogin.password
                }
            })
            await setstate(true)
        }
    })

    return (
        <>
            <h2>Login</h2>
            <Form className="login-form" onSubmit={formik.handleSubmit}>
                <Form.Input iconPosition='left' type="text"
                    placeholder='Usuario' name="user" onChange={formik.handleChange}
                    error={formik.errors.user}>
                    <Icon name='user' />
                    <input />
                </Form.Input>
                <Form.Input iconPosition='left' type="password"
                    placeholder='Contraseña' name="password" onChange={formik.handleChange}
                    error={formik.errors.password}>
                    <Icon name='lock' />
                    <input />
                </Form.Input>
                <Button type="submint" fluid color='black'>Ingresar</Button>
                <br></br>
                {errorLogin && <Button fluid color='red' disabled={true}>{errorLogin}</Button>}
            </Form>
        </>
    );
}

