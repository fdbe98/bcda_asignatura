import {drizzleReactHooks} from '@drizzle/react-plugin'
import {useParams, Link} from "react-router-dom";
const {useDrizzle} = drizzleReactHooks;
const ProfesoresDetail = () => {
 const {useCacheCall} = useDrizzle();
 let {addr} = useParams();
 const datos = useCacheCall("Asignatura", "datosProfesor", addr);
 return <>
 <header className="AppAlumno">
 <h2>Profesor Info</h2>
 </header>
 <ul>
 <li><b>Nombre:</b> {datos ?? "Desconocido"}</li>
 <li><b>Address:</b> {addr}</li>
 </ul>
 <Link to="/profesores">Volver</Link>
 </>
};
export default ProfesoresDetail;