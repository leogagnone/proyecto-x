import { Router, Response, Request } from "express";
import Token from "../class/token";
import { verificarToken } from "../middlewares/authentication";
import jwt from 'jsonwebtoken';
import connection from "../bin/conectionMySql";

const userSqlRoutes = Router()

userSqlRoutes.post('/createUser', (req:any, res:Response)=>{
    const body = req.body
    const nombre= body.nombre
    const apellido= body.apellido
    const tipo_documento= body.tipo_documento
    const numero_documento= body.numero_documento
    const nombre_usuario= body.nombre_usuario
    const password= body.password

    function query(query:string, variables:any){
        return new Promise((resolve,reject)=>{
            connection.query(query, variables, (error, result)=>{
                if (error){
                    return reject(error);
                    
                }
                else{
                    return resolve(result)
                }
            })
        })
    }
    query("star.transaction", [])
        .then(resultTransaction =>query('INSERT INTO PERSONAS (NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO)VALUES(?,?,?,?)',[nombre, apellido, tipo_documento, numero_documento]))
        .then(resultPersona=>{
        query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO, PASSWORD)VALUES(?,?,?)", [resultQuery.insertId, nombre_usuario, password])
        .then(resultUsuarios => query("commit",[]))
        .then(resultCommit => res.json({estado: "success", data:resultCommit}))
        .catch(error=>{
            query("rollback",[])
            res.json({estado:"success", data:error})
        }) 
    
    
    
})
export default userSqlRoutes
