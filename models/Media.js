const{Schema, model}=require('mongoose');

// Creacion de la entidad Media con todos sus campos

const MediaSchema=Schema({
    serial:{type:String, require:true, unique:true},
    titulo:{type:String, require:true},
    sinopsis:{type:String, require:true},
    url:{type:String, require:true},
    imagen:{type:String, require:true},
    anoEstreno:{type:String, require:true},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true},
    generoPrincipal:{type: Schema.Types.ObjectId, ref:'Genero', require:false},
    directorPrincipal:{type: Schema.Types.ObjectId, ref:'Director', require:false},
    productoraPrincipal:{type: Schema.Types.ObjectId, ref:'Productora', require:false},
    tipo:{type: Schema.Types.ObjectId, ref:'Tipo', require:false},
});

module.exports=model('Media', MediaSchema);