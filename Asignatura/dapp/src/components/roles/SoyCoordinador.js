import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyCoordinador = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const coordinador = useCacheCall("Asignatura", "coordinador");
    
    if (coordinador !== drizzleState.accounts[0]) {
        return null
    }
    return <>
        {children}
    </>
};
export default SoyCoordinador;