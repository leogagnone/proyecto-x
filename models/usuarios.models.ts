import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema= new Schema({
    nombre:{
        type:String,
        require:[true, "El nombre es necesario"],
    },
    email:{
        type:String, 
        unique: true,
        require:[true, "El mail es necesario"]
    },
    password:{
        type:String, 
        require:[true, "Este campo es obligatorio"]
    }, 
    avatar:{
        type:String,
        default:'av1.png'
    },

    
})
usuarioSchema.method('compararPassword', function(password:string = ""):boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true
    }
    else{
        return false
    }
})
interface Iusuario extends Document{
    nombre:string,
    email:string,
    avatar:string,
    password:string, 

    compararPassword(password:string):boolean
}

const Usuario= model<Iusuario>('Usuario', usuarioSchema)
export default Usuario