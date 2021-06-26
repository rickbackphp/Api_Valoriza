import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUsersService{

    async execute({email, password}: IAuthenticateRequest){
        //Verificar se um email existe
        const userRepository = getCustomRepository(UsersRepository);

        const userExists = await userRepository.findOne({
            email
        });

        if(!userExists){
            throw new Error("Email/Senha incorreta!");
        }
        //Verificar se a senha é valida
        const passwordMatch = await compare(password, userExists.password);

        if(!passwordMatch){
            throw new Error("Email/Senha incorreta!");
        }
        //Gerar o token
        const token = sign({
            email: userExists.email,
        }, "1b7ec96243d90e11c523c6bcde8fb182", {
            subject: userExists.id,
            expiresIn: "1d"
        });

        return token;
    }   

}

export { AuthenticateUsersService }