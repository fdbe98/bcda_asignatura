import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle } = drizzleReactHooks;



const AnadirProfesor = () => {
    const { drizzle } = useDrizzle();
    const [setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario
    let [direccion, setdireccion] = useState("");
    let [nombre, setnombre] = useState("");
    return (<article className="AppMisDatos">

        <h3>Añadir Profesor</h3>
        <form>
            <p> Dirección del Profesor: &nbsp;
                <input key="profesor" type="text" name="profesor" value={direccion} placeholder="Dirección del profesor"
                    onChange={ev => setdireccion(ev.target.value)} /> </p>
            <p> Nombre del profesor: &nbsp;
                <input key="nombre" type="text" name="nombre" value={nombre} placeholder="Nombre del profesor"
                    onChange={ev => setnombre(ev.target.value)} /> </p>

            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Asignatura.methods.addProfesor.cacheSend(direccion, nombre);
                    setLastStackID(stackId);
                }}>Añadir Profesor</button>
        </form>

    </article>);
};

export default AnadirProfesor;