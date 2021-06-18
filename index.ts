import Server from "./class/server";
import userRouter from "./routes/usuarios";
import connection from "./bin/conectionMySql";
import mongoose from "mongoose";
import userSqlRoutes from "./routes/userSql";




//Server web
const server = new Server();
server.start(()=>{
    console.log(`server running on port ${server.puerto} and host ${server.host}`)
})
//Rutas aplicacion
server.app.use('/users', userRouter)
server.app.use('/userSQL', userSqlRoutes);

//Conexion Base de datos MySQL
connection.connect

//Conexion MongoDB
mongoose.connect('mongodb://localhost:27017/appCurso_mar_vie',
                    {useNewUrlParser:true, useCreateIndex:true},
                    (error)=>{
                        if(error){
                            throw error
                        }
                        else{
                            console.log("Aplicación conectada a base de datos Mongo")
                        }
                    }

)