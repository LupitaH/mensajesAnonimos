import React, { useState } from 'react';
import { Container, Form, Button, Icon, TextArea } from "semantic-ui-react"
import { useFormik, validateYupSchema } from "formik"
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { MENSAJES, CREARMENSAJE, EDITARMENSAJE, ELIMINARMENSAJE } from "../../gql/message";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { getId, removeId } from '../../utils/id'
import './Admin.scss'

export default function Auth() {
    const [createMessage] = useMutation(CREARMENSAJE);
    const [state, setstate] = useState(true)
    const [mensj, setsMensj] = useState(false)
    const iduser = getId()

    const { loading, data, error } = useQuery(MENSAJES, {
        variables: {
            user: localStorage.getItem('id'),
        }
    });

    var result = []
    var arrayMensajes = []
    if (data && data.messages && !mensj) {
        result = data.messages
        if (result.lenght > 0) {
            setsMensj(true)
            console.log(data.messages)
        }
    }
    if (error) {
        console.log(error)
    }

    const formik = useFormik({
        initialValues: {
            mensaje: "",
        },
        validationSchema: Yup.object({
            mensaje: Yup.string().required("Obligatorio"),
        }),
        onSubmit: async (formData) => {
            try {
                const newMens = formData;

                const result = await createMessage({
                    variables: {
                        user: iduser,
                        message: newMens.mensaje
                    }
                })
                console.log(result.data.createMessage)
                if (result.data.createMessage == null) {
                    toast.error("No se pudo enviar el mensaje")
                } else {
                    toast.success("Mensaje enviado correctamente")
                    console.log(result)
                    window.location.reload(false);
                }

            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }

        }
    })

    function cerrarSesion(event) {
        event.preventDefault();
        event.stopPropagation();
        removeId()
        window.location.reload(false);
    }

    return (
        <>
            <Container fluid className="admin">
                <Form className="container-form" onSubmit={formik.handleSubmit}><div>
                    <h2>Escribe un mensaje</h2>
                    <br></br>
                    <TextArea placeholder='Confieso que...' style={{ minHeight: 100 }}
                        name="mensaje" onChange={formik.handleChange}
                        error={formik.errors.mensaje} />
                </div>
                    <Button type="submint" fluid color='black'>Enviar mensaje</Button>
                    <br></br>
                </Form>
            </Container>
            <Container fluid className="bottom">
                <br></br><br></br>
                <div className="notepad">
                    <div className="header"><Button inverted color='blue' onClick={cerrarSesion}>Cerrar sesión</Button></div>
                    <div className="paper">
                        <h2>Mis mensajes</h2>
                        {!mensj ? <> {result.map((msj) => (<div className="notas" id={msj.id}>{msj.message}</div>))}
                        </> : <h3>No tienes mensajes</h3>
                        }
                    </div>
                </div>



            </Container></>
    )
}