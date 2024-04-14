const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/',[
    check('serial', 'serial no valido').not().isEmpty(),
    check('titulo', 'titulo no valido').not().isEmpty(),
    check('sinopsis', 'sinopsis no valido').not().isEmpty(),
    check('url', 'url no valido').not().isEmpty(),
    check('imagen', 'imagen no valido').not().isEmpty(),
    check('anoEstreno', 'anoEstreno no valido').not().isEmpty(),
    check('generoPrincipal', 'generoPrincipal no valido').not().isEmpty(),
    check('directorPrincipal', 'directorPrincipal no valido').not().isEmpty(),
    check('productoraPrincipal', 'productoraPrincipal no valido').not().isEmpty(),
    check('tipo', 'tipo no valido').not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('serial ya existe en media');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;
        media.anoEstreno = req.body.anoEstreno;
        media.generoPrincipal = req.body.generoPrincipal._id;
        media.directorPrincipal = req.body.directorPrincipal._id;
        media.productoraPrincipal = req.body.productoraPrincipal._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();

        res.send(media);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function(req, res){
    try {
        const medias=await Media.find().populate([
            {
                path:'generoPrincipal', select:'nombre estado'
            },
            {
                path:'directorPrincipal', select:'nombre estado'
            },
            {
                path:'productoraPrincipal', select:'nombre estado'
            },
            {
                path:'tipo', select:'nombre'
            }
        ]);
        res.send(medias);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:mediaId',[
    check('serial', 'serial no valido').not().isEmpty(),
    check('titulo', 'titulo no valido').not().isEmpty(),
    check('sinopsis', 'sinopsis no valido').not().isEmpty(),
    check('url', 'url no valido').not().isEmpty(),
    check('imagen', 'imagen no valido').not().isEmpty(),
    check('anoEstreno', 'anoEstreno no valido').not().isEmpty(),
    check('generoPrincipal', 'generoPrincipal no valido').not().isEmpty(),
    check('directorPrincipal', 'directorPrincipal no valido').not().isEmpty(),
    check('productoraPrincipal', 'productoraPrincipal no valido').not().isEmpty(),
    check('tipo', 'tipo no valido').not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        /*
        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('serial ya existe en media');
        }
        */

        let media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(400).send('media no existe');
        }
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;
        media.anoEstreno = req.body.anoEstreno;
        media.generoPrincipal = req.body.generoPrincipal._id;
        media.directorPrincipal = req.body.directorPrincipal._id;
        media.productoraPrincipal = req.body.productoraPrincipal._id;
        media.tipo = req.body.tipo._id;
        media.fechaActualizacion = new Date();

        media = await media.save();

        res.send(media);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/:mediaId',async function(req,res){
    try {
        const media=await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('Media no existe');
        }
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar media')
    }
})

module.exports=router;