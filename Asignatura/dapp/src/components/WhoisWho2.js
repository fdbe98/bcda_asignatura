import { drizzleReactHooks } from '@drizzle/react-plugin'
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const WhoisWho2 = ({children}) => {
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
            <>
            {children}
            </>
        );
    }


    else if (coordinador === drizzleState.accounts[0]) {
        return (
            <>
            {children}
            </>
        );
    }

    //Ver quien soy

    for (let i = 0; i < numero_profesores; i++) {

        if (rows[i] === drizzleState.accounts[0]) {
            return (
                <>
                {children}
                </>
            );
        }
    }


    return (
        <>
        {children}
        </>
    );


};
export default WhoisWho2;