import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import SoyCoordinador from '../roles/SoyCoordinador';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const EvaluacionDetail = () => {
    const { drizzle, useCacheCall } = useDrizzle();
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
    let [fecha, setFecha] = useState("");
    let [porcentaje, setPorcentaje] = useState("");
    let { evaluacionIndex } = useParams();

    let {ev} = useCacheCall(['Asignatura'],
    call => {
    const eva = call("Asignatura", "evaluaciones", evaluacionIndex);
    return {eva};
    }
    );

   // const datos = useCacheCall("Asignatura", "datosAlumno", addr);
    return <>
        <header className="AppEvaluacion">
            <h2>Alumno Info</h2>
        </header>
        <ul>
            
            <li><b>Evaluacion :</b> {evaluacionIndex}</li>
        </ul>



        <SoyCoordinador>
            <h3>Modificar Evaluación</h3>
            <form>
                <p> Nombre: &nbsp;
                    <input key="profesor" type="text" name="nombre" value={nombre} 
                        onChange={ev => setNombre(ev.target.value)} /> </p>
                <p> Fecha: &nbsp;
                    <input key="fecha" type="number" name="fecha" value={fecha} placeholder="Fecha"
                        onChange={ev => setFecha(ev.target.value)} /> </p>
                <p> Porcentaje: &nbsp;
                    <input key="porcentaje" type="number" name="porcentaje" value={porcentaje} placeholder="Porcentaje"
                        onChange={ev => setPorcentaje(ev.target.value)} /> </p>

                <button key="submit" className="pure-button" type="button"
                    onClick={ev => {
                        ev.preventDefault();
                        const stackId = drizzle.contracts.Asignatura.methods.modificaEvalacion.cacheSend("Pablo", 23, 2, 0);
                        setLastStackID(stackId);
                    }}>Modificar</button>
            </form>
        </SoyCoordinador>




        <Link to="/evaluaciones">Volver</Link>
    </>
};
export default EvaluacionDetail;