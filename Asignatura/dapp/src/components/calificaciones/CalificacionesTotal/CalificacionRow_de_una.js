import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
const { useDrizzle } = drizzleReactHooks;


const CalificacionRow_de_una = ({ alumnoIndex }) => {
    const { useCacheCall } = useDrizzle();
    let { i } = useParams();
    
    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);
    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );
    
    
    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }
        let cells = [];
        const evaluacionesLength = call("Asignatura", "evaluacionesLength") || 0;
        for (let ei = 0; ei < 1; ei++) {
            const nota = call("Asignatura", "calificaciones", alumnoAddr, i);
            cells.push(
                <td key={"p2-" + alumnoIndex + "-" + ei}>
                    {nota?.tipo === "0" ? "" :
                        ""}
                    {nota?.tipo === "1" ? "N.P." :
                        ""}
                    {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                </td>
            );
        }
        return cells;
    })
    return <tr key={"d" + alumnoIndex}>
    <th>A<sub>{alumnoIndex}</sub></th>
    <td>{i}</td>
    <td>{alumnoName}</td>
    {cells}
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
export default CalificacionRow_de_una;