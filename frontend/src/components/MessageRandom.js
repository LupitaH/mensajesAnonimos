import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useQuery, useLazyQuery, LazyQueryHookOptions } from '@apollo/client';
import { RANDOM } from "../gql/message";

export default function MessageRandom() {
    const [random, setRandom] = useState(undefined);
    //const { loading, data, error, refetch } = useQuery(RANDOM, {});
    const [messageRandom, { loading, data, error, refetch, called }] = useLazyQuery(RANDOM);
    const [state, setstate] = useState(false)
    const [refetchNeeded, setRefetchNeeded] = useState(false);

    useEffect(() => {
        if (refetchNeeded) {
            setRefetchNeeded(false);
            refetch();
        }
    }, [refetchNeeded]);

    if (data && data.messageRandom && state) {
        setstate(false)
        console.log(data.messageRandom[0].message)
        setRandom(data.messageRandom[0].message)
    }
    async function VerMensaje(event) {
        event.preventDefault();
        event.stopPropagation();

        await messageRandom({});
        setstate(true)
        setRefetchNeeded(true);
    }

    return (
        <div>
            <div className="notepad">
                <div className="header"><Button inverted color='blue' onClick={VerMensaje}>VER MENSAJE</Button></div>
                <div className="paper">
                    {random ? <p>{random}</p> : <p>En esta página podrás escribir cualquier cosa que quieras, pero sin revelar tu identidad.
                        Comparte tus secretos y pensamientos con la comunidad, y lee lo que los demás comparten.
                        <br></br><br></br>TODO ES DE MANERA ANÓNIMA <br></br> ¡¡ DIVIÉRTERE !!</p>}
                </div>
            </div>

        </div >
    )
}
