import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
import SoyCoordinador from "../roles/SoyCoordinador";

//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle } = drizzleReactHooks;



const AnadirEvaluacion = () => {
    const { drizzle } = useDrizzle();
    const [ setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario

    let [nombre, setNombre] = useState("");
    let [fecha, setFecha] = useState("");
    let [porcentaje, setPorcentaje] = useState("");

    return (<article className="AppMisDatos">
        <SoyCoordinador>
            <h3>Añadir Evaluación</h3>
            <form>
                <p> Nombre: &nbsp;
                    <input key="profesor" type="text" name="nombre" value={nombre} placeholder="Nombre"
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
                        const stackId = drizzle.contracts.Asignatura.methods.creaEvaluacion.cacheSend(nombre, fecha, porcentaje);
                        setLastStackID(stackId);
                    }}>Añadir</button>
            </form>
        </SoyCoordinador>
    </article>);
};

export default AnadirEvaluacion;