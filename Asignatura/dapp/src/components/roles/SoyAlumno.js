import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyAlumno = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
  //  const es_alumno = useCacheCall("Asignatura", "estaMatriculado", drizzleState.accounts[0]);


    let { es_alumno} = useCacheCall(['Asignatura'],
        call => {
            const es_alumno = call("Asignatura", "estaMatriculado", drizzleState.accounts[0]);
          
            return { es_alumno};
        }
    );



    if (!es_alumno) {
        return null
    }
    return <>
        {children}
    </>
};
export default SoyAlumno;