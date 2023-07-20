const mongoose =  require('mongoose');

const dbConnect = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Base de datos --Online--');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la ---Base de Datos---');
    }

}

module.exports = {
    dbConnect
}