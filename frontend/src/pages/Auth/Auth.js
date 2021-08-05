import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import './Auth.scss';

export default function Auth() {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <Container fluid className="auth">
            <div className="container-form">
                {showLogin ? <LoginForm></LoginForm> :
                    <RegisterForm setShowLogin={setShowLogin}></RegisterForm>}
            </div>
            <div className="change-form">
                {showLogin ? (
                    <>No tienes cuenta<br></br>
                        <span onClick={() => setShowLogin(!showLogin)}>
                            Registrate
                        </span></>
                ) : (
                    <>Entra con tu cuenta<br></br>
                        <span onClick={() => setShowLogin(!showLogin)}>
                            Iniciar sesión
                        </span></>
                )}
            </div>
        </Container>
    )
}