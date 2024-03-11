const{Schema, model}=require('mongoose');

// Creacion de la entidad Productora con todos sus campos

const ProductoraSchema=Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String, require:true},
    slogan:{type:String, require:true},
    estado:{type:String,require:true, enum:['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true}
});

module.exports=model('Productora', ProductoraSchema);