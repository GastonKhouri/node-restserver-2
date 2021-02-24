const { response } = require('express');
const { Producto } = require('../models');


const obtenerProductos = async(req, res = response) => {

    const {desde = 0, limite = 5} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde))                
    ]);

    res.json({
        total,
        productos
    })

}

const obtenerProducto = async(req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id)
                           .populate('usuario', 'nombre')
                           .populate('categoria', 'nombre');

    res.json({
        producto
    });

}

const crearProducto = async(req, res = response) => {

    const {estado, usuario, ...data} = req.body;

    const nombre = data.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    data.nombre = nombre;
    data.usuario = req.usuario._id;

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json({
        producto
    });

}

const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const productoDB = await Producto.findOne({nombre: data.nombre});

    if(productoDB._id != id){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json({
        producto
    });

}

const borrarProducto = async(req, res = response) => {

    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        productoBorrado
    });

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}