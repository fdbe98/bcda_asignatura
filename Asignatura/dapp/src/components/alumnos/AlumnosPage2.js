import AlumnosList from "./AlumnosList";
import AnadirAlumno from "./AnadirAlumno";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyProfesor from "../roles/SoyProfesor";
import AnadirAlumnoDireccion from "./AnadirAlumnoDireccion";
import { drizzleReducers } from "@drizzle/store";
import {drizzleReactHooks} from '@drizzle/react-plugin'


const AlumnosPage2 = () => {


const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {useCacheCall} = useDrizzle();
const drizzleState = useDrizzleState(state => state);
const esAlumno = useCacheCall("Asignatura", "estaMatricula", drizzleState.accounts[0]);
   


return(
    <section className="AppAlumnos">
        <h2>Alumnos</h2>

        <SoyOwner>
            <AlumnosList />
            <AnadirAlumnoDireccion/>
        </SoyOwner>

        <SoyCoordinador>
            <AlumnosList />
        </SoyCoordinador>

        <SoyProfesor>
            <AlumnosList />
        </SoyProfesor>
        
       


    </section>
    );
    };
export default AlumnosPage2;