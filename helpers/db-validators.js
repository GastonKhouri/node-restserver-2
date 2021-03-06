const { Categoria, Role, Usuario, Producto } = require('../models');

const esRoleValido = async(role = '') => {

    // Verificar si el role existe
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El role ${role} no está registrado en la BD`);
    }

}

const emailExiste = async(correo = '') => {

    // Verificar si el correo ya existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }

}

const existeUsuarioPorId = async(id = '') => {

    // Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }

}

const existeCategoriaPorId = async(id = '') => {

    // Verificar si el id existe
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }

}

const existeProductoPorId = async(id = '') => {

    // Verificar si el id existe
    const existeProducto = await Producto.findById(id);
    if(!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }

}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}