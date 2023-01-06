import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBodyAlumno from "./CalificacionesBodyAlumno";
const CalificacionAlumno = () => {
 return (
 <section className="AppCalificaciones">
 <h3>Todas las Calificaciones</h3>
 <table>
 <CalificacionesHead />
 <CalificacionesBodyAlumno />
 </table>
 </section>
 );
};
export default CalificacionAlumno;