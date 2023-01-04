import ProfesoresList from "./ProfesoresList";
import AnadirProfesor from "./AnadirProfesor";
import SoyOwner from "../roles/SoyOwner";


const ProfesoresPage = () => (
    <section className="AppAlumnos">
        <h2>Profesores</h2>


        <ProfesoresList />
        <SoyOwner>
            <AnadirProfesor />
        </SoyOwner>


    </section>
);
export default ProfesoresPage;