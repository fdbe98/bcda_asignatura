import { drizzleReactHooks } from "@drizzle/react-plugin";
import { useParams, Link } from "react-router-dom";
import CalificacionRow_de_una from "./CalificacionRow_de_una";
import SoyProfesor from "../../roles/SoyProfesor";
import SoyCoordinador from "../../roles/SoyCoordinador";
const { useDrizzle } = drizzleReactHooks;






const CalificacionesBody_de_una = () => {
    const { useCacheCall } = useDrizzle();
    let { i } = useParams();
    const ml = useCacheCall("Asignatura", "matriculasLength") || 0;
    let rows = [];


    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);
    thead.push(<th key={"chev-" + i}>Nota</th>);




    for (let u = 0; u < ml; u++) {
        rows.push(<CalificacionRow_de_una key={"cb-" + u} alumnoIndex={u} i={i} />);
    }

    return (
        <>
        <h1>Evaluación</h1>
            <SoyCoordinador>
                <tbody>{thead}</tbody>
                <tbody>{rows}</tbody>
                
            </SoyCoordinador>
            <SoyProfesor>
                <tbody>{thead}</tbody>
                <tbody>{rows}</tbody>
                
            </SoyProfesor>
            <p><Link to="/calificaciones">Volver</Link></p>
            
        </>
    )
};


export default CalificacionesBody_de_una;