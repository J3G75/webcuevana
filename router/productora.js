const { Router } = require('express');
const Marca = require('../models/Productora');
const { validationResult, check } = require('express-validator');
const Productora = require('../models/Productora');

const router = Router();

router.post('/', [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan=req.body.slogan;
        productora.descripcion=req.body.descripcion;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();

        productora = await productora.save();

        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function (req, res) {
    try {
        const productoras = await Productora.find(); // select * from usuario
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:productoraId', [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(400).send('Productora no existe');
        }

        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan=req.body.slogan;
        productora.descripcion=req.body.descripcion;
        productora.fechaActualizacion = new Date();

        productora = await productora.save();

        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;