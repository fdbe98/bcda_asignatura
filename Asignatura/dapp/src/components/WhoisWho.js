import { drizzleReactHooks } from '@drizzle/react-plugin'
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const WhoisWho = () => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const numero_profesores = useCacheCall("Asignatura", "profesoresLength") || 0;

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");


    //Conseguir los profesores

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        for (let ei = 0; ei < numero_profesores; ei++) {
            const addr_profesor = call("Asignatura", "profesores", ei);
            rows.push(addr_profesor)
        }
        return rows;
    });









    if (owner === drizzleState.accounts[0]) {
        return (
            Number("1")
        );
    }


    else if (coordinador === drizzleState.accounts[0]) {
        return (
            2
        );
    }

    //Ver quien soy
    
        for (let i = 0; i < numero_profesores; i++) {
    
            if (rows[i] === drizzleState.accounts[0]) {
                return (
                   3
                );
            }
        }
        

            return (
               4
            );

            








/*

    if (owner === drizzleState.accounts[0]) {
        return (
            <header className="AppHeader">
                <h1>
                   Soy el owner
                </h1>
            </header>
        );
    }


    else if (coordinador === drizzleState.accounts[0]) {
        return (
            <header className="AppHeader">
                <h1>
                   Soy coordinador
                </h1>
            </header>
        );
    }

    //Ver quien soy
    
        for (let i = 0; i < numero_profesores; i++) {
    
            if (rows[i] === drizzleState.accounts[0]) {
                return (
                    <header className="AppHeader">
                        <h1>
                            Numero de profesores {numero_profesores} SOY PROFESOR
                        </h1>
                    </header>
                );
            }
        }
        

            return (
                <header className="AppHeader">
                    <tr>
                        <td><h1>
                    Soy alumno
                    </h1>
                    </td>
                    <td>
                       Cuenta que estamos usando: {drizzleState.accounts[0]}
                       </td>
                    </tr>
                </header>
            );

            */
       
};
export default WhoisWho;