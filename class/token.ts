import jwt from "jsonwebtoken"

class Token{
    private static seed:string= "thisIsMySeed"
    private static caducidad:string= "60d"

    constructor(){}

    static getToken(payload:{}):string{
        const token= jwt.sign({
            usuario:payload
        }, 
        this.seed,
        {expiresIn: this.caducidad})  
        return token  
    }

    static checkToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.seed,(error,decode)=>{
                if(error){
                    return reject(error)
                }
                else{
                    return resolve(decode)
                }
            })
        })
    }
}

export default Token;