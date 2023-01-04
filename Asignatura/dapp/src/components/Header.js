import { drizzleReactHooks } from '@drizzle/react-plugin'

import WhoisWho from "./WhoisWho";


const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const Header = () => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const nombre = useCacheCall("Asignatura", "nombre");
    const curso = useCacheCall("Asignatura", "curso");

    /*
    1 - owner
    2 - coordinador
    3 - profesor
    4 - alumno
    */
 
    return (
        <header className="AppHeader">
            <h1>
                Asignatura Lite: {nombre}-<em>{curso}</em>
            </h1>
        </header>
    );

};
export default Header;