module.exports = async callback => {
    try {
        const Asignatura = artifacts.require("./Asignatura.sol");
        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }
        let asignatura = await Asignatura.deployed();
        // Identificar al profesor:
        let owner = await asignatura.owner();
        console.log("Cuenta del owner =", owner);

        console.log("Creamos el coordinador:");
        await asignatura.setCoordinador(accounts[3]);

        let coordinador = await asignatura.coordinador();
        console.log("Cuenta del coordinador =", coordinador);


        console.log("Creamos el profesor:");
        await asignatura.addProfesor(accounts[4], "Santiago");


        console.log("Crear cuatro evaluaciones:");
        await asignatura.creaEvaluacion("Parcial 1",
            Date.now() + 60 * 24 * 3600000,
            25, { from: coordinador });
        await asignatura.creaEvaluacion("Parcial 2",
            Date.now() + 120 * 24 * 3600000,
            30, { from: coordinador });
        await asignatura.creaEvaluacion("Práctica 1",
            Date.now() + 50 * 24 * 3600000,
            20, { from: coordinador });
        await asignatura.creaEvaluacion("Práctica 1",
            Date.now() + 110 * 24 * 3600000,
            25, { from: coordinador });
        console.log("Matricular a dos alumnos:");
        let evaAccount = accounts[1];
        let pepeAccount = accounts[2];
        console.log("Cuenta de Eva =", evaAccount);
        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.automatricula("Eva Martinez", "em@dominio.es",
            { from: evaAccount });
        await asignatura.automatricula("Jose Redondo", "jr@stio.com",
            { from: pepeAccount });
        console.log("Añadir calificaciones:");
        await asignatura.califica(evaAccount, 0, 1, 0, { from: coordinador });
        await asignatura.califica(evaAccount, 1, 2, 400, { from: coordinador });
        await asignatura.califica(evaAccount, 2, 2, 750, { from: coordinador });
        await asignatura.califica(evaAccount, 3, 2, 900, { from: coordinador });
        await asignatura.califica(pepeAccount, 0, 0, 0, { from: coordinador });
        await asignatura.califica(pepeAccount, 1, 1, 0, { from: coordinador });
        await asignatura.califica(pepeAccount, 2, 2, 350, { from: coordinador });
        await asignatura.califica(pepeAccount, 3, 2, 650, { from: coordinador });
    } catch (err) { // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }
    callback(); // Terminar
};