import { drizzleReactHooks } from '@drizzle/react-plugin'
import { Link } from "react-router-dom";
const { useDrizzle } = drizzleReactHooks;
const ProfesorRow = ({ ProfesorIndex }) => {
    const { useCacheCall } = useDrizzle();
    let { addr, datos } = useCacheCall(['Asignatura'],
        call => {
            const addr = call("Asignatura", "profesores", ProfesorIndex);
            const datos = addr && call("Asignatura", "datosProfesor", addr);
            return { addr, datos };
        }
    );
    return <tr key={"PRO-" + ProfesorIndex}>
        <th>A<sub>{ProfesorIndex}</sub></th>
        <td>{datos}</td>
        <td><Link to={`/profesores/${addr}`}>Info</Link></td>
    </tr>;
};

//  const addr_profesor = call("Asignatura", "profesores", ei);
export default ProfesorRow;