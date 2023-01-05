// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

/**
 * El contrato Asignatura que representa una asignatura de la carrera.
 *
 * Version Lite
 */
contract Asignatura {
    /// Version 2022 Lite - Teoria
    string public version = "2022 Lite";
    /**
     * address del profesor que ha desplegado el contrato.
     * El contrato lo despliega el profesor.
     */
    address public profesor;

    // Array con las direcciones de los profesores añadidos
    address[] public profesores;

    // Acceder al nombre de un profesor dada su dirección
    mapping(address => string) public datosProfesor;

    // Dirección del owner
    address public owner;

    /// Nombre de la asignatura
    string public nombre;

    /// Curso academico
    string public curso;

    // Coordinador de la asignatura
    address public coordinador;

    // Coordinador de la asignatura
    bool public cerrada;

    /// Datos de un alumno.
    struct DatosAlumno {
        string nombre;
        string email;
    }

    /// Acceder a los datos de un alumno dada su direccion.
    mapping(address => DatosAlumno) public datosAlumno;

    // Array con las direcciones de los alumnos matriculados.
    address[] public matriculas;

    /**
     * Datos de una evaluacion.
     */
    struct Evaluacion {
        string nombre;
        uint256 fecha;
        uint256 porcentaje;
    }

    /// Evaluaciones de la asignatura.
    Evaluacion[] public evaluaciones;

    /// Tipos de notas: sin usar, no presentado, y nota normal entre 0 y 1000.
    enum TipoNota {
        Empty,
        NP,
        Normal
    }

    /**
     * Datos de una nota.
     * La calificacion esta multiplicada por 100 porque no hay decimales.
     */
    struct Nota {
        TipoNota tipo;
        uint256 calificacion;
    }

    // Dada la direccion de un alumno, y el indice de la evaluacion, devuelve
    // la nota del alumno.
    mapping(address => mapping(uint256 => Nota)) public calificaciones;

    /**
     * Constructor.
     *
     * @param _nombre Nombre de la asignatura.
     * @param _curso Curso academico.
     */
    constructor(string memory _nombre, string memory _curso) {
        require(
            bytes(_nombre).length != 0,
            "El nombre de la asignatura no puede ser vacio"
        );
        require(
            bytes(_curso).length != 0,
            "El curso academico de la asignatura no puede ser vacio"
        );

        owner = msg.sender;
        nombre = _nombre;
        curso = _curso;
    }

    // Asignar la adirección del usuario coordinador
    function setCoordinador(address addr) public soloOwner soloAbierta {
        coordinador = addr;
    }

    // Cerrar la asignatura
    function cerrar() public soloCoordinador {
        cerrada = true;
    }

    // Añadir un profesor nuevo. Impedir que se pueda meter un nombre vacío
    function addProfesor(address _addr, string memory _nombre)
        public
        soloOwner
        soloAbierta
    {
        require(
            bytes(datosProfesor[_addr]).length == 0,
            "Ese profesor ya ha sido added"
        );
        require(
            bytes(_nombre).length != 0,
            "El nombre del profesor no puede estar vacio"
        );

        datosProfesor[_addr] = _nombre;
        profesores.push(_addr);
    }

    // Devolver número de profesores añadidos
    function profesoresLength() public view returns (uint256) {
        return profesores.length;
    }

    /**
     * Los alumnos pueden automatricularse con el metodo automatricula.
     *
     * Impedir que se pueda meter un nombre vacio.
     *
     * @param _nombre El nombre del alumno.
     * @param _email El email del alumno.
     */
    function automatricula(string memory _nombre, string memory _email)
        public
        soloNoMatriculados
    {
        require(bytes(_nombre).length != 0, "El nombre no puede ser vacio");
        DatosAlumno memory datos = DatosAlumno(_nombre, _email);
        datosAlumno[msg.sender] = datos;
        matriculas.push(msg.sender);
    }

    /**
     * El owner puede matricular a los alumnos
     *
     * Impedir que se pueda meter un nombre vacio.
     *
     * @param _nombre El nombre del alumno.
     * @param _email El email del alumno.
     * @param _addr La dirección del alumno.
     */
    function matriculaDir(
        string memory _nombre,
        string memory _email,
        address _addr
    ) public soloNoMatriculados soloOwner {
        require(bytes(_nombre).length != 0, "El nombre no puede ser vacio");
        DatosAlumno memory datos = DatosAlumno(_nombre, _email);
        datosAlumno[_addr] = datos;
        matriculas.push(_addr);
    }

    /**
     * El numero de alumnos matriculados.
     *
     * @return El numero de alumnos matriculados.
     */
    function matriculasLength() public view returns (uint256) {
        return matriculas.length;
    }

    /**
     * Permite a un alumno obtener sus propios datos.
     *
     * @return _nombre El nombre del alumno que invoca el metodo.
     * @return _email El email del alumno que invoca el metodo.
     */
    function quienSoy()
        public
        view
        soloMatriculados
        returns (string memory _nombre, string memory _email)
    {
        DatosAlumno memory datos = datosAlumno[msg.sender];
        _nombre = datos.nombre;
        _email = datos.email;
    }

    /**
 * Crear una prueba de evaluacion de la asignatura. Por ejemplo, el primer parcial, o la practica 3.
 *
 * Las evaluaciones se meteran en el array evaluaciones, y nos referiremos a ellas por su posicion en el
array.
 *
 * @param _nombre El nombre de la evaluacion.
 * @param _fecha La fecha de evaluacion (segundos desde el 1/1/1970).
 * @param _porcentaje El porcentaje de puntos que proporciona a la nota final.
 *
 * @return La posicion en el array evaluaciones,
 */
    function creaEvaluacion(
        string memory _nombre,
        uint256 _fecha,
        uint256 _porcentaje
    ) public soloCoordinador soloAbierta returns (uint256) {
        require(
            bytes(_nombre).length != 0,
            "El nombre de la evaluacion no puede ser vacio"
        );

        evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje));
        return evaluaciones.length - 1;
    }

    /*
 * Modifica una prueba de evaluacion de la asignatura. Por ejemplo, el primer parcial, o la practica 3.
 *
 * Las evaluaciones se meteran en el array evaluaciones, y nos referiremos a ellas por su posicion en el
array.
 *
 * @param _nombre El nombre de la evaluacion.
 * @param _fecha La fecha de evaluacion (segundos desde el 1/1/1970).
 * @param _porcentaje El porcentaje de puntos que proporciona a la nota final.
 * @param _index
 */
    function ModificaEvaluacion(
        string memory _nombre,
        uint256 _fecha,
        uint256 _porcentaje,
        uint256 _index
    ) public soloCoordinador soloAbierta {

        Evaluacion memory ev = evaluaciones[_index];
        ev.nombre = _nombre;
        ev.fecha = _fecha;
        ev.porcentaje = _porcentaje;
        evaluaciones[_index] = ev;
        
    }

    /*       function DevolverEvaluacion(uint256 _index) public soloCoordinador soloAbierta returns (string memory _nombre, uint256 _fecha, uint256 _porcentaje) {
 

        Evaluacion memory ev = evaluaciones[_index];
        _nombre = ev.nombre;
        _fecha = ev.fecha;
        _porcentaje = ev.porcentaje;

        return (_nombre, _fecha, _porcentaje);
    }

*/

    /**
     * El numero de evaluaciones creadas.
     *
     * @return El numero de evaluaciones creadas.
     */
    function evaluacionesLength() public view returns (uint256) {
        return evaluaciones.length;
    }

    /**
     * Poner la nota de un alumno en una evaluacion.
     *
     * @param alumno La direccion del alumno.
     * @param evaluacion El indice de una evaluacion en el array evaluaciones.
     * @param tipo Tipo de nota.
     * @param calificacion La calificacion, multipilicada por 100 porque no hay decimales.
     */
    function califica(
        address alumno,
        uint256 evaluacion,
        TipoNota tipo,
        uint256 calificacion
    ) public soloProfesor soloAbierta {
        require(
            estaMatriculado(alumno),
            "Solo se pueden calificar a un alumno matriculado."
        );
        require(
            evaluacion < evaluaciones.length,
            "No se puede calificar una evaluacion que no existe."
        );
        require(
            calificacion <= 1000,
            "No se puede calificar con una nota superior a la maxima permitida."
        );
        Nota memory nota = Nota(tipo, calificacion);

        calificaciones[alumno][evaluacion] = nota;
    }

    /**
 * Devuelve el tipo de nota y la calificacion que ha sacado el alumno que invoca el metodo en la evaluacion
pasada como parametro.
 *
 * @param evaluacion Indice de una evaluacion en el array de evaluaciones.
 *
 * @return tipo El tipo de nota que ha sacado el alumno.
 * @return calificacion La calificacion que ha sacado el alumno.
 */
    function miNota(uint256 evaluacion)
        public
        view
        soloMatriculados
        returns (TipoNota tipo, uint256 calificacion)
    {
        require(
            evaluacion < evaluaciones.length,
            "El indice de la evaluacion no existe."
        );

        Nota memory nota = calificaciones[msg.sender][evaluacion];

        tipo = nota.tipo;
        calificacion = nota.calificacion;
    }

    /*
     * Devuelve el tipo de nota y la calificacion que ha sacado de la direccion del alumno.
     *
     * @param evaluacion Indice de una evaluacion en el array de evaluaciones.
     * @param _direccion
     * @return tipo El tipo de nota que ha sacado el alumno.
     * @return calificacion La calificacion que ha sacado el alumno.
     */
    function miNotaDir(uint256 evaluacion, address _direccion)
        public
        view
        soloMatriculados
        returns (TipoNota tipo, uint256 calificacion)
    {
        require(
            evaluacion < evaluaciones.length,
            "El indice de la evaluacion no existe."
        );

        Nota memory nota = calificaciones[_direccion][evaluacion];

        tipo = nota.tipo;
        calificacion = nota.calificacion;
    }

    // Devuelve la nota final del alumno que llama al método
    // Si el tipo de nota de alguna de las evaluaciones es "Empty" no se le ha asignado la calificación y el método devuelve (Empty, 0)
    // Si todas las calificaciones son NP, devuelve (NP, 0)
    // Si la nota final es superior a 400 y hay alguna evaluación NP, entonces devuelve como máximo 499
    function miNotaFinal()
        public
        view
        soloMatriculados
        returns (TipoNota tipo, uint256 calificacion)
    {
        return _notaFinal(msg.sender);
    }

    //Devuelve la nota final del alumno indicado
    function notaFinal(address _addr)
        public
        view
        soloCoordinador
        returns (TipoNota tipo, uint256 calificacion)
    {
        return _notaFinal(_addr);
    }

    function _notaFinal(address _addr)
        private
        view
        returns (TipoNota tipo, uint256 calificacion)
    {
        tipo = TipoNota.NP;

        for (uint256 i = 0; i < evaluaciones.length; i++) {
            if (calificaciones[_addr][i].tipo == TipoNota.Empty) {
                return (TipoNota.Empty, 0);
            }
            if (calificaciones[_addr][i].tipo == TipoNota.Normal) {
                tipo = TipoNota.Normal;
                continue;
            }
        }
        if (tipo == TipoNota.NP) {
            return (tipo, 0);
        }

        bool suspenso = false;
        uint256 nota = 0;

        for (uint256 i = 0; i < evaluaciones.length; i++) {
            // if (
            //     calificaciones[_addr][i].calificacion < evaluaciones[i].minimo
            // ) {
            //     suspenso = true;
            // }
            nota +=
                (calificaciones[_addr][i].calificacion *
                    evaluaciones[i].porcentaje) /
                100;
        }
        if (suspenso && nota > 499) {
            nota = 499;
        }
        tipo = TipoNota.Normal;
        calificacion = nota;
    }

    /**
     * Consulta si una direccion pertenece a un alumno matriculado.
     *
     * @param alumno La direccion de un alumno.
     *
     * @return true si es una alumno matriculado.
     */
    function estaMatriculado(address alumno) private view returns (bool) {
        string memory _nombre = datosAlumno[alumno].nombre;

        return bytes(_nombre).length != 0;
    }

    // Modificador para que una función solo la pueda ejecutar el owner
    modifier soloOwner() {
        require(msg.sender == owner, "Solo permitido al owner");
        _;
    }

    // Modificador para que una función solo la pueda ejecutar el coordinador
    modifier soloCoordinador() {
        require(msg.sender == coordinador, "Solo permitido al coordinador");
        _;
    }

    // Modificador para que una función solo la pueda ejecutar el profesor
    modifier soloProfesor() {
        string memory _nombre = datosProfesor[msg.sender];
        require(bytes(_nombre).length != 0, "Solo permitido al profesor");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno matriculado.
     */
    modifier soloMatriculados() {
        require(
            estaMatriculado(msg.sender),
            "Solo permitido a alumnos matriculados"
        );
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno no matriculado aun.
     */
    modifier soloNoMatriculados() {
        require(
            !estaMatriculado(msg.sender),
            "Solo permitido a alumnos no matriculados"
        );
        _;
    }

    // Modificador para que una función solo la pueda ejecutar si la asignatura no está cerrada
    modifier soloAbierta() {
        require(!cerrada, "Solo permitido si la asignatura no esta cerrada");
        _;
    }

    /**
     * No se permite la recepcion de dinero.
     */
    receive() external payable {
        revert("No se permite la recepcion de dinero.");
    }
}
