import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import SoyCoordinador from '../roles/SoyCoordinador';
const { useDrizzle } = drizzleReactHooks;

const EvaluacionDetail = () => {
    const { drizzle, useCacheCall } = useDrizzle();
    const [setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario

    let [nombre, setNombre] = useState("");
    let [fecha, setFecha] = useState("");
    let [porcentaje, setPorcentaje] = useState("");
    let { evaluacionIndex } = useParams();

    let { eva } = useCacheCall(['Asignatura'],
        call => {
            const eva = call("Asignatura", "evaluaciones", evaluacionIndex);
            return { eva };
        }
    );

    // const datos = useCacheCall("Asignatura", "datosAlumno", addr);
    return <>
        <header className="AppEvaluacion">
            <h2> Evaluación Info</h2>
        </header>
        <ul>

            <li><b>Evaluacion :</b> E<sub>{evaluacionIndex}</sub></li>
        </ul>



        <SoyCoordinador>
            <h3>Modificar Evaluación</h3>
            <form>
                <p> Nombre: &nbsp;
                    <input key="profesor" type="text" name="nombre" value={nombre} placeholder={eva?.nombre}
                        onChange={ev => setNombre(ev.target.value)} /> </p>
                <p> Fecha: &nbsp;
                    <input key="fecha" type="number" name="fecha" value={fecha} placeholder={eva?.fecha}
                        onChange={ev => setFecha(ev.target.value)} /> </p>
                <p> Porcentaje: &nbsp;
                    <input key="porcentaje" type="number" name="porcentaje" value={porcentaje} placeholder={eva?.porcentaje}
                        onChange={ev => setPorcentaje(ev.target.value)} /> </p>

                <button key="submit" className="pure-button" type="button"
                    onClick={ev => {
                        ev.preventDefault();
                        const stackId = drizzle.contracts.Asignatura.methods.modificaEvaluacion.cacheSend(nombre, fecha, porcentaje, evaluacionIndex);
                        setLastStackID(stackId);
                    }}>Modificar</button>
            </form>
        </SoyCoordinador>




        <p><Link to="/evaluaciones">Volver</Link></p>
    </>
};
export default EvaluacionDetail;