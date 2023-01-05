import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";
import SoyProfesor from "../roles/SoyProfesor";
import SoyCoordinador from "../roles/SoyCoordinador";

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

        </section>
    );
};
export default CalificacionesPage;