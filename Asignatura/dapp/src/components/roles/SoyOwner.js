import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const SoyOwner = ({ children }) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const owner = useCacheCall("Asignatura", "owner");
    if (owner !== drizzleState.accounts[0]) {
        return null
    }
    return <>
        {children}
    </>
};
export default SoyOwner;