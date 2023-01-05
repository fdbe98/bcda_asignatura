import { drizzleReactHooks } from '@drizzle/react-plugin'
import ModificarCoordinador from "../ModificarCoordinador";
import CerrarAsignatura from "../CerrarAsignatura";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyProfesor from "../roles/SoyProfesor";


function HomePage() {
    const { useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");
    const cerrada = useCacheCall("Asignatura", "cerrada");
    const es_cerrada = cerrada ? "CERRADA" : "ABIERTA";
    return (
        <div>
            <p>Página Home de la Asignatura.
            </p>

            <p>
                Creado por owner: {owner}
            </p>

            <p>
                Coordinador: {coordinador}
            </p>
            <p>
                Estado de la asignatura: {es_cerrada}
            </p>
            <SoyOwner>
                <ModificarCoordinador />
            </SoyOwner>
            <SoyCoordinador>
                <CerrarAsignatura />
            </SoyCoordinador>
        </div>

    );
}
export default HomePage;