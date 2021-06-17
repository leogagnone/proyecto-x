import { Router, Request, Response, request } from "express";
import Usuario from "../models/usuarios.models";
import bcrypt from "bcrypt";
import Token from "../class/token";
import { verificarToken } from "../middlewares/authentication";

const userRouter = Router()

userRouter.post('/login', (req:Request, res:Response)=>{
    Usuario.findOne({email: req.body.email}, null, null, (error, result)=>{
            if (error){
                throw error
            }
                if (!result)
                 return res.json({
                estado: "Success",
                mensaje: "Usuario no encontrado en Base de datos",
                data: result
                })
                if(result.compararPassword(req.body.password)){

                    const tokenJwt = Token.getToken({
                        _id: result.id,
                        nombre: result.nombre,
                        email: result.email,
                        avatar: result.avatar
                    })
        
                    return res.json({
                        estado:"success",
                        mensaje: "usuario encontrado",
                        data: result,
                        token: tokenJwt
                    })
                }
                else{
                    return res.json({
                        estado: "success",
                        mensaje: "usuario no encontrado en base de datos",
                        data: result
                    })
                }
            })
        
        })
    


userRouter.post('/create', (req:Request, res:Response)=>{
    const user ={
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }
    Usuario.create(user)
            .then(result=>{
                res.json({
                    estado: "success",
                    mensaje: result    
                })
            })
            .catch(error=>{
                res.json({
                    estado: "error",
                    mensaje: error
                })
            })

})
userRouter.put('./update', verificarToken, (req:any, res:Response)=>{
    //const user = {
     //   nombre: req.body.nombre,
       // email: req.body.email,
        //avatar: req.body.avatar
    //}
    let user:any = {}
    const atributos = ["nombre", "email", "avatar", "password"]
    atributos.forEach(item=>{
        if (item == 'password'){
            user[item] = bcrypt.hashSync(req.body[item],10)
        }
        else{
            user[item] = req.body[item]
        }
        
    })
    Usuario.findByIdAndUpdate(req.usuario._id, user, {new:true}, (error, result)=>{
        if (error){
            throw error
        }
        if (!result){
            res.json({
                estado: "Success",
                mensaje: "Usuario no existe en la base de datos"
            })
        }
        if (result){
                res.json({
                estado: "Success",
                data: result,
                refreshToken: req.token
            })
        }
    })
})

export default userRouter