const{Schema, model}=require('mongoose');

// Creacion de la entidad Genero con todos sus campos

const GeneroSchema=Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String,require:true},
    estado:{type:String,require:true, enum:['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true}
});

module.exports=model('Genero', GeneroSchema);