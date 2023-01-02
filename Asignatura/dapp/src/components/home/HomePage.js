import { drizzleReactHooks } from '@drizzle/react-plugin'

function HomePage() {
    const { useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");
    const cerrada = useCacheCall("Asignatura", "cerrada");
    const es_cerrada = cerrada ? "ABIERTA" : "CERRADA";
    return (
        <div>
            <p>Página Home de la Asignatura. Creado por owner: {owner}
            </p>
            <p>
                Coordinador: {coordinador}
            </p>
            <p>
                Cerrada: {es_cerrada}
            </p>
        </div>

    );
}
export default HomePage;