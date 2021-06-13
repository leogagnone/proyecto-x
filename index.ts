import Server from "./class/server";
import userRouter from "./routes/usuarios";
import connection from "./bin/conectionMySql";
import mongoose from "mongoose";


//Server web
const server = new Server();
server.start(()=>{
    console.log(`server running on port ${server.puerto} and host ${server.host}`)
})
//Rutas aplicacion
server.app.use('/users', userRouter)

//Conexion Base de datos MySQL
connection.connect

//Conexion MongoDB
const mongodb = mongoose.connect('mongodb://localhost:27017/appCurso_ma_vie',
                {useNewUrlParser:true, useCreateIndex:true},
                (error)=>{
                    if (error){
                        throw error
                    }
                    else{
                        console.log("Aplicacion conectada a MongoDB")
                    }
                }
)
export default mongodb;
