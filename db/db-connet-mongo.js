const mongoose=require('mongoose');

const getConnection=async()=>{

    try{

        const url='mongodb+srv://seguridad1-jwt:JGonzalez01@cluster0.ecf65rj.mongodb.net/cuevanaweb?retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);

        console.log('Conexion exitosa');

    }catch(error){
        console.log(error);
    }

}

module.exports={
    getConnection,
}