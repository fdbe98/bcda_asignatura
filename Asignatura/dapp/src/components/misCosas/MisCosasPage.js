import { drizzleReactHooks } from '@drizzle/react-plugin'
import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyOwner from "../roles/SoyOwner";

const MisCosasPage = () => {

    const { useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");
    
    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <MisDatos />
        <MisNotas />
    </section>;
}
export default MisCosasPage;