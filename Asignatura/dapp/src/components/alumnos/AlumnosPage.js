import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyProfesor from "../roles/SoyProfesor";
import AlumnosList from "./AlumnosList";
import AnadirAlumno from "./AnadirAlumno";
import AnadirAlumnoDireccion from "./AnadirAlumnoDireccion";


const AlumnosPage = () => (
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

        <AnadirAlumno />


    </section>
);
export default AlumnosPage;