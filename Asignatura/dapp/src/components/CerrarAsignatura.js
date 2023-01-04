import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
//import SoyProfesor from "../roles/SoyProfesor";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



const CerrarAsignatura = () => {
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