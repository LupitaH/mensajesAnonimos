import React from "react"
import { Form, Button, Icon } from "semantic-ui-react"
import { useFormik, validateYupSchema } from "formik"
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client';
import { REGISTER } from "../gql/user";

export default function RegisterForm(props) {
    const { setShowLogin } = props;
    const [createUser] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",
            repeatpass: ""
        },
        validationSchema: Yup.object({
            user: Yup.string().matches(/^[a-zA-Z0-9-]*$/,
                "El nombre del usuario solo puede contener letras y números").required("Obligatorio"),
            password: Yup.string().required("Obligatorio")
                .oneOf([Yup.ref("repeatpass")], "Contraseñas no coinciden"),
            repeatpass: Yup.string().required("Obligatorio")
                .oneOf([Yup.ref("password")], "Contraseñas no coinciden")
        }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData;
                delete newUser.repeatpass;

                const result = await createUser({
                    variables: {
                        user: newUser.user,
                        password: newUser.password
                    }
                })
                console.log(result.data.createUser)
                if (result.data.createUser == null) {
                    toast.error("El usuario ya existe")
                } else {
                    toast.success("Usuario registrado correctamente")
                    console.log(result)
                    window.location.reload(false);
                }

            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }
        }
    })

    return (
        <>
            <h2>Registro</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
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
                <Form.Input iconPosition='left' type="password"
                    placeholder='Repetir contraseña' name="repeatpass" onChange={formik.handleChange}
                    error={formik.errors.repeatpass}>
                    <Icon name='lock' />
                    <input />
                </Form.Input>
                <Button type="submint" fluid color='black'>Registrarse</Button>
            </Form>
        </>
    );
}

