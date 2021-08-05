import React, { useState, useEffect, useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import client from './config/apollo'
import Auth from './pages/Auth/Auth'
import Admin from './pages/Admin/Admin'
import MessageRandom from './components/MessageRandom'
import { getId } from './utils/id'
import AuthContext from './context/AuthContext'

function App() {
  const [auth, setAuth] = useState(undefined);
  //const authData = {user: "user",}

  useEffect(() => {
    const iduser = getId()
    if (!iduser) {
      setAuth(null)
    }
    else {
      setAuth(iduser)
    }
  }, [])

  const logout = () => {
    console.log("Cerrar sesión")
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  return (

    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        <div className="App">
          <header className="App-header">
            <br></br>
            <h1>Tell me a SECRET</h1>
            <br></br>
          </header>
          <MessageRandom></MessageRandom>
        </div>
        <br></br>
        {!auth ? <Auth></Auth> : <Admin></Admin>}
        <ToastContainer position='top-right' autoClose={5000}
          hideProgressBar newestOnTop closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover>

        </ToastContainer>
      </AuthContext.Provider>
    </ApolloProvider>

  );
}

export default App;