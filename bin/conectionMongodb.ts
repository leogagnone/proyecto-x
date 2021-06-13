import mongoose from "mongoose";

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