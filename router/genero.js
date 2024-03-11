const { Router } = require('express');
const Marca = require('../models/Genero');
const { validationResult, check } = require('express-validator');
const Genero = require('../models/Genero');

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

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();

        genero = await genero.save();

        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function (req, res) {
    try {
        const generos = await Genero.find(); // select * from usuario
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:generoId', [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
            return res.status(400).send('Genero no existe');
        }

        genero.nombre = req.body.nombre;
        genero.descripcion = req.body.descripcion
        genero.estado = req.body.estado;
        genero.fechaActualizacion = new Date();

        genero = await genero.save();

        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;