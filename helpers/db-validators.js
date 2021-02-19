const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

    // Verificar si el correo ya existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}