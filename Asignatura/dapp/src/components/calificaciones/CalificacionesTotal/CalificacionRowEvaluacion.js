import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import SoyProfesor from '../../roles/SoyProfesor';
const { useDrizzle } = drizzleReactHooks;


const CalificacionRowEvaluacion = ({ alumnoIndex }) => {
    const { useCacheCall } = useDrizzle();
    let { i } = useParams();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);
    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );


    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }
        let cells = [];

        const nota = call("Asignatura", "calificaciones", alumnoAddr, i);
        cells.push(
            <td key={"p2-" + alumnoIndex + "-"}>
                {nota?.tipo === "0" ? "" :
                    ""}
                {nota?.tipo === "1" ? "N.P." :
                    ""}
                {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
            </td>
        );

        return cells;
    })

    return <tr key={"d" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoName}</td>
        {cells}
        <SoyProfesor>
            <td><Link to={`/calificacionDetail/${alumnoIndex}/${i}`}>Editar</Link></td>
        </SoyProfesor>
    </tr>;


};


/*

    return <tr key={"d" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{eva}</td>
        <td>{alumnoName}</td>
        {cells}
    </tr>;
};

*/
export default CalificacionRowEvaluacion;