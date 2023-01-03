import { Outlet } from "react-router-dom";
import Header from "./Header";
import WhoisWho from "./WhoisWho";
import AnadirProfesor from "./AnadirProfesor";
import Navegacion from "./Navegacion";
import ModificarCoordinador from "./ModificarCoordinador";
import Devolvernumero from "./Devolvernumero";
function Layout() {

    const numero = <Devolvernumero />;

 return (
 <>
 <Header />


 <Navegacion />
 <Outlet />
 </>
 );
}
export default Layout;