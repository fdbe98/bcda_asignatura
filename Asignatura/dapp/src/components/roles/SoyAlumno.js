import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyAlumno = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const profesorAddr = useCacheCall("Asignatura", "profesor");
    if (profesorAddr !== drizzleState.accounts[0]) {
        return null
    }
    return <>
        {children}
    </>
};
export default SoyAlumno;