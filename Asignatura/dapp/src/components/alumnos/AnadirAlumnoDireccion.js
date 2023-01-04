import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



const AnadirAlumnoDireccion = () => {
    const { drizzle } = useDrizzle();
    // Obtener el status de la ultima transaccion enviada:
    const { transactionStack, transactions } = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;
    // Conservar los valores metidos en el formulario

    let [nombre, setNombre] = useState("");
    let [email, setEmail] = useState("");
    let [direccion, setDireccion] = useState("");


    return (<article className="AppMisDatos">

        <h3>Añadir Alumno - Owner</h3>
        <form>
            <p> Nombre del alumno: &nbsp;
                <input key="nombre" type="text" name="nombre" value={nombre} placeholder="Nombre"
                    onChange={ev => setNombre(ev.target.value)} /> </p>
            <p> Email del alumno: &nbsp;
                <input key="email" type="text" name="email" value={email} placeholder="alumno@alumno.es"
                    onChange={ev => setEmail(ev.target.value)} /> </p>
            <p> Dirección del alumno: &nbsp;
                <input key="direccion" type="address" name="direccion" value={direccion} placeholder="0x0000"
                    onChange={ev => setDireccion(ev.target.value)} /> </p>

            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Asignatura.methods.matriculaDir.cacheSend(nombre, email, direccion);
                    setLastStackID(stackId);
                }}>Añadir Alumno</button>
        </form>

    </article>);
};

export default AnadirAlumnoDireccion;