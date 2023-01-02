import { drizzleReactHooks } from '@drizzle/react-plugin'
import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";

const MisCosasPage = () => {

    const { useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");
    const profesores = useCacheCall("Asignatura", "profesores.0");

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        Profe: {profesores}
        <MisDatos />
        <MisNotas />
    </section>;
}
export default MisCosasPage;