import { drizzleReactHooks } from '@drizzle/react-plugin'
import ModificarCoordinador from "./ModificarCoordinador";

import { useState } from "react";
import SoyProfesor from "../roles/SoyProfesor";


import WhoisWho2 from "./WhoisWho2";


const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const Header2 = () => {
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
   return(<article className="AppMisDatos">
    <WhoisWho2>

     
        <header className="AppHeader">
            <h1>
                Asignatura Lite: {nombre}-<em>{curso}</em>
                <br></br>

                <h3>ERES OWNER</h3>
            </h1>
        </header >
       

    </WhoisWho2></article>
);
};
export default Header2;