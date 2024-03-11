const { Router } = require('express');
const Marca = require('../models/Director');
const { validationResult, check } = require('express-validator');
const Director = require('../models/Director');

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

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();

        director = await director.save();

        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function (req, res) {
    try {
        const directores = await Director.find(); // select * from usuario
        res.send(directores);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:directorId', [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(400).send('Director no existe');
        }

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date();

        director = await director.save();

        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;