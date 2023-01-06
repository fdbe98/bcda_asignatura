import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyAlumno from '../roles/SoyAlumno';

const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <MisDatos />
        <SoyAlumno>
            <MisNotas />
        </SoyAlumno>
    </section>;
}
export default MisCosasPage;