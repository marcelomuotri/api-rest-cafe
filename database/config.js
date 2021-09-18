const mongoose = require ('mongoose')




const dbConection = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_CNN ,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("conectado a la base de datos")
    } catch (error) {
        

        console.log(error)
        throw new Error("error al conectarse a la base de datos")
    }



}

module.exports = {
    dbConection
}