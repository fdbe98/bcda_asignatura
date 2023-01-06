import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle } = drizzleReactHooks;



const CerrarAsignatura = () => {
    const { drizzle } = useDrizzle();
    const [setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario

    return (<article className="AppMisDatos">

        <h3>Cerrar Asignatura</h3>
        <form>
            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
                    setLastStackID(stackId);
                }}>Cerrar asignatura</button>

        </form>

    </article>);
};

export default CerrarAsignatura;