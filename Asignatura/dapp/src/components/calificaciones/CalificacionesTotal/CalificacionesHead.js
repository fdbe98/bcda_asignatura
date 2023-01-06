import { drizzleReactHooks } from '@drizzle/react-plugin'
import { Link } from "react-router-dom";
const { useDrizzle } = drizzleReactHooks;
const CalificacionesHead = () => {
    const { useCacheCall } = useDrizzle();
    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);
    const el = useCacheCall("Asignatura", "evaluacionesLength") || 0;
    for (let i = 0; i < el; i++) {
        thead.push(<th key={"chev-" + i}><Link to={`/calificaciones/${i}`}>E<sub>{i}</sub></Link></th>);
    }
    thead.push(<th key={"chfinal"}>Final</th>);
    return <thead><tr>{thead}</tr></thead>;
};
export default CalificacionesHead;