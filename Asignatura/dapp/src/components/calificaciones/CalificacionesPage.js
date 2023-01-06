import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";
import SoyProfesor from "../roles/SoyProfesor";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyAlumno from "../roles/SoyAlumno";
import MisNotas from "../misCosas/MisNotas";

const CalificacionesPage = () => {
    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

            <SoyCoordinador>
                <CalificacionesTotal />
                <Calificar />
            </SoyCoordinador>

            <SoyProfesor>
                <CalificacionesTotal />
                <Calificar />
            </SoyProfesor>

            <SoyAlumno>
                <MisNotas />
            </SoyAlumno>

        </section>
    );
};
export default CalificacionesPage;