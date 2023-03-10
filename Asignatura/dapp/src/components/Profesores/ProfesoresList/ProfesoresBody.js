import { drizzleReactHooks } from '@drizzle/react-plugin'
import ProfesorRow from "./ProfesorRow";
const { useDrizzle } = drizzleReactHooks;

const ProfesoresBody = () => {

    const { useCacheCall } = useDrizzle();
    const numero_profesores = useCacheCall("Asignatura", "profesoresLength") || 0;

    //Conseguir los profesores
    let rows = [];


    for (let ei = 0; ei < numero_profesores; ei++) {
        rows.push(<ProfesorRow key={"ab-" + ei} ProfesorIndex={ei} />);

    }
    return <tbody>{rows}</tbody>;



};
export default ProfesoresBody;