import { getCustomRepository } from 'typeorm';
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from 'bcryptjs';

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUsersService{

    async execute({name, email, admin = false, password }: IUserRequest){
        const userRepository = getCustomRepository(UsersRepository);

        if(!email){
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("Usuario ja existe")
        }

        const passwordHash = await hash(password, 8)

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        await userRepository.save(user);

        return user;
    }
}

export { CreateUsersService }