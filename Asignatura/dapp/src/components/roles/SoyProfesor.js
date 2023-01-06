import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyProfesor = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const numero_profesores = useCacheCall("Asignatura", "profesoresLength") || 0;
    
    //Conseguir los profesores

     let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        for (let ei = 0; ei < numero_profesores; ei++) {
            const addr_profesor = call("Asignatura", "profesores", ei);
            rows.push(addr_profesor)
        }
        return rows;
    });
    for (let i = 0; i < numero_profesores; i++) {

        if (rows[i] === drizzleState.accounts[0]) {
            return (
                <>
                {children}
                </>
            );
        }
       
    }
};
export default SoyProfesor;