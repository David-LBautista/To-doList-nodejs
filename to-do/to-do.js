const fs = require('fs');
const colors = require('colors');


let listaToDo = [];

const saveOnDb = () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listaToDo);
        fs.writeFile('database/data.json', data, (err) => {
            if (err) {
                reject(`No se pudo grabar el archivo`, err);
            } else {
                resolve();
            }
        });
    });
};

//! Carga la DB con las tareas que ya tiene
const loadDb = () => {
    try {
        listaToDo = require('../database/data.json');
        console.log(listaToDo);
    } catch (error) {
        listaToDo = [];
    }
    return listaToDo;
};

//! Crea y agrega una tarea a la DB
const crear = (descripcion) => {

    loadDb();
    let nuevaDesc = convertir(descripcion);
    let toDo = {
        descripcion: nuevaDesc,
        completado: false
    };

    listaToDo.push(toDo);
    saveOnDb();
    return toDo;
};

const update = (descripcion, completado = true) => {
    loadDb();

    //? Para encontrar el index de la descripcion que nosotros necesitamos
    let index = listaToDo.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listaToDo[index].completado = completado;
        //* Guardamos en la base de datos
        saveOnDb();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    loadDb();
    let nuevaDesc = convertir(descripcion);

    let index = listaToDo.findIndex(tarea => tarea.descripcion === nuevaDesc);

    if (index >= 0) {
        let elementoEliminado = listaToDo.splice(index, 1);

        //* Guardamos la base de datos
        saveOnDb();
        return true;
    } else {
        return false;
    }
};

const convertir = (descripcion) => {
    loadDb();
    let desc = descripcion.toLowerCase();
    return desc[0].toUpperCase() + descripcion.slice(1).toLowerCase();
};


module.exports = {
    crear,
    loadDb,
    update,
    borrar
};