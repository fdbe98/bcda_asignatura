import {drizzleReactHooks} from "@drizzle/react-plugin";
import { useParams, Link } from "react-router-dom";
import CalificacionRow_de_una from "./CalificacionRow_de_una";
const {useDrizzle} = drizzleReactHooks;






const CalificacionesBody_de_una = () => {
 const {useCacheCall} = useDrizzle();
 let { i } = useParams();
 const ml = useCacheCall("Asignatura", "matriculasLength") || 0;
 let rows = [];
 
 rows.push(<CalificacionRow_de_una key={"cb-"+ 0} alumnoIndex={0} i={i}/>);
 rows.push(<CalificacionRow_de_una key={"cb-"+ 1} alumnoIndex={1} i={i}/>);

 return (
 <>
 {i}
 <tbody>{rows}</tbody>
 </>
 )
};



/* 



const CalificacionesBody_de_una = () => {
 const {useCacheCall} = useDrizzle();
 let { i } = useParams();
 const ml = useCacheCall("Asignatura", "matriculasLength") || 0;
 let rows = [];
 for (let ei = 0; ei < ml; i++) {
 rows.push(<CalificacionRow_de_una key={"cb-"+ei} alumnoIndex={ei} i={i}/>);
 }
 return (
 <>
 {i}
 <tbody>{rows}</tbody>
 </>
 )
};

*/




export default CalificacionesBody_de_una;