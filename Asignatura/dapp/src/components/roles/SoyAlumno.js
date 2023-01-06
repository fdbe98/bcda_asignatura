import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyAlumno = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    //Conseguir los alumnos

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        for (let ei = 0; ei < matriculasLength; ei++) {
            const addr_alumno = call("Asignatura", "matriculas", ei);
            rows.push(addr_alumno)
        }
        return rows;
    });
    for (let i = 0; i < matriculasLength; i++) {

        if (rows[i] === drizzleState.accounts[0]) {
            return (
                <>
                {children}
                </>
            );
        }
        
    }
};
export default SoyAlumno;