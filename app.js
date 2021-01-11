const argv = require('./config/yargs').argv;
const toDo = require('./to-do/to-do');
const color = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = toDo.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = toDo.loadDb(argv.listaToDo);
        for (let tarea of listado) {
            console.log(`======================`);
            console.log(`${tarea.descripcion}`.blue);
            console.log(`Estado: `.green, tarea.completado);
            console.log(`======================`);
        }
        break;
    case 'actualizar':
        let actualizar = toDo.update(argv.descripcion, argv.completado);
        console.log(actualizar);
        break;

    case 'borrar':
        let borrar = toDo.borrar(argv.descripcion);
        console.log(borrar);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}