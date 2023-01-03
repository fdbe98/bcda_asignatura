import { drizzleReactHooks } from '@drizzle/react-plugin'
import ModificarCoordinador from "./ModificarCoordinador";
import WhoisWho from "./WhoisWho";


const { useDrizzle } = drizzleReactHooks;
const Header = () => {

    const { useCacheCall } = useDrizzle();

    const nombre = useCacheCall("Asignatura", "nombre");
    const curso = useCacheCall("Asignatura", "curso");

/*
1 - owner
2 - coordinador
3 - profesor
4 - alumno
*/
    var numero = <WhoisWho />;
   
    if( <WhoisWho /> == Number("1"))
    {
        return (
            <header className="AppHeader">
                <h1>
                    Asignatura Lite: {nombre}-<em>{curso}</em>
                    <p>OWNER</p>
                </h1>
                <ModificarCoordinador />
            </header>
        );


    }


    else if( Number(numero) === 2)
    {
        return (
            <header className="AppHeader">
                <h1>
                    Asignatura Lite: {nombre}-<em>{curso}</em>
                    <p>COORDINADOR</p>
                </h1>
        
            </header>
        );


    }
    else{
    return (
        <header className="AppHeader">
            <h1>
                Asignatura Lite: {nombre}-<em>{curso}</em>
                <p>{numero}</p>
                <p>NO</p>
            </h1>
        </header>
    );
    }
};
export default Header;