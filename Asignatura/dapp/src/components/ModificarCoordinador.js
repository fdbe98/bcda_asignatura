import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



const ModificarCoordinador = () => {
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
    let [direccion, setdireccion] = useState("");

    return (<article className="AppMisDatos">
      
            <h3>Añadir Profesor</h3>
            <form>
                <p> Dirección del Coordinador nuevo: &nbsp;
                    <input key="coordinador" type="text" name="coordinador" value={direccion} placeholder="Dirección del Coordinador"
                        onChange={ev => setdireccion(ev.target.value)} /> </p>


                <button key="submit" className="pure-button" type="button"
                    onClick={ev => {
                        ev.preventDefault();
                        const stackId = drizzle.contracts.Asignatura.methods.setCoordinador.cacheSend(direccion);
                        setLastStackID(stackId);
                    }}>Modificar Coordinador</button>

            </form>
  
    </article>);
};

export default ModificarCoordinador;