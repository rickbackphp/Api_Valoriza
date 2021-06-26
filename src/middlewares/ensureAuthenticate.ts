import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'

interface IPayload{
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    //Receber o token
    const authToken = request.headers.authorization
    /* console.log(token); */

    //Validar se token esta prenchido
    if (!authToken) {
        return response.status(401).json({ message: "Token invalido!!" })
    }

    //Validar se o token é valido

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "1b7ec96243d90e11c523c6bcde8fb182") as IPayload;
        /* console.log(decode); */

        //Recuperar informações do usuario
        request.user_id = sub;

        return next();

    } catch (err){
        return response.status(401).end()
    }
}