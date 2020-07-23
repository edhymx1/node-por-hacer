const fs = require("fs");
const { boolean } = require("yargs");

let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile("./db/data.json", data, (error) => {
    if (error) {
      throw new Error("No se puedo grabar", error);
    }
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require("./../db/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
};

const crear = (descripcion) => {
  cargarDB();

  let porHacer = {
    descripcion,
    completado: false,
  };

  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer;
};

const getListado = () => {
  cargarDB();

  return listadoPorHacer;
};

const getListadoPorEstado = (completado = true) => {
  cargarDB();

  let c = completado === "true";

  return listadoPorHacer.filter((tarea) => tarea.completado === c);
};

const actualizar = (descripcion, completado = true) => {
  cargarDB();

  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );

  let c = completado === "true";

  if (index >= 0) {
    listadoPorHacer[index].completado = c;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = (descripcion) => {
  cargarDB();

  let nuevaLista = listadoPorHacer.filter(
    (tarea) => tarea.descripcion !== descripcion
  );

  if (listadoPorHacer.length === nuevaLista.length) {
    return false;
  } else {
    listadoPorHacer = nuevaLista;
    guardarDB();
    return true;
  }
};

module.exports = { crear, getListado, actualizar, borrar, getListadoPorEstado };
