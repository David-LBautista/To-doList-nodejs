const argv = require('yargs')
    .command('crear', 'Crea una actividad por hacer', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripcion de la tarea por hacer'
        },
    })
    .command('actualizar', 'Actualiza el status de una actividad', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Actualiza la tarea a actualizar'
        },
        completado: {
            alias: 'c',
            default: true,
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .command('borrar', 'Borra una actividad por hacer', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Descripcion de la tarea a eliminar'
        }
    })
    .help()
    .argv;


module.exports = {
    argv
};