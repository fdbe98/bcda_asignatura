import ProfesoresHead from "./ProfesoresHead";
import ProfesoresBody from "./ProfesoresBody";

function ProfesoresList() {
    return (
        <section className="AppProfesores">
            <h3>Todos los Profesores</h3>
            <table>
                <ProfesoresHead />
                <ProfesoresBody />
            </table>
        </section>
    );
}
export default ProfesoresList;