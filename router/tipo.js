const { Router } = require('express');
const Marca = require('../models/Tipo');
const { validationResult, check } = require('express-validator');
const Tipo = require('../models/Tipo');

const router = Router();

router.post('/', [
    check('nombre', 'nombre no valido').not().isEmpty(),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function (req, res) {
    try {
        const tipos = await Tipo.find(); // select * from usuario
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:tipoId', [
    check('nombre', 'nombre no valido').not().isEmpty(),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('Tipo no existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;