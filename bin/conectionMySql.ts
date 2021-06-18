import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "reclamos_v2", 
    port: 3306

})
connection.connect((error)=>{
     if (error){
         throw error
     }
     else{
         console.log("Aplicacion conectada a Base de Datos MySQL")
     }
})
export default connection