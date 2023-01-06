import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const CalificacionesDetail = () => {
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

    let [nota, setNota] = useState("");
    let [tipo, setTipo] = useState("");
    let { alumnoIndex, i } = useParams();


    //Nombre del alumno
    let { addr, datos } = useCacheCall(['Asignatura'],
        call => {
            const addr = call("Asignatura", "matriculas", alumnoIndex);
            const datos = addr && call("Asignatura", "datosAlumno", addr);
            return { addr, datos };
        }
    );

    //Calificacion del alumno de la evaluacion i
    const calificacion = useCacheCall("Asignatura", "calificaciones", addr, i);


    // return <>
    //     <ul>

    //         <li><b>Alumno :</b> {alumnoIndex}</li>
    //         <li>{datos?.nombre}</li>
    //         <li>  {i}</li>
    //     </ul>
    // </>



    return <>
        <header className="AppCalificacion">
            <h2>Calificaciones Info</h2>
        </header>
        <ul>

            <li><b>Alumno :</b> {alumnoIndex}</li>
            {i}
        </ul>
       
        <h3>Modificar calificación</h3>
        <h4>{datos?.nombre}</h4>
        <form>

            <p> Nota (x100): &nbsp;
                <input key="nota" type="number" name="nota" value={nota} placeholder={calificacion?.calificacion}
                    onChange={ev => setNota(ev.target.value)} /> </p>
             <p> Tipo: (0=Pendiente 1=N.P. 2=Normal): &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota" onChange={ev => setTipo(ev.target.value)} /> </p>
            
            
            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Asignatura.methods.califica.cacheSend(addr, i, tipo, nota);
                    setLastStackID(stackId);
                }}>Modificar</button>
        </form>




        <Link to="/calificaciones">Volver</Link>
    </>
};
export default CalificacionesDetail;