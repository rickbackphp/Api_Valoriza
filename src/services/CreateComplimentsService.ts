import { getCustomRepository } from 'typeorm';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository'
import { UsersRepository } from '../repositories/UsersRepository';

interface IComplimentsRequest{
    tag_id: string;
    user_sender: string;
    user_receive: string;
    message: string;
}


class CreateComplimentsService{
    
    async execute({tag_id, user_sender, user_receive, message}: IComplimentsRequest){
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        if(user_sender === user_receive){
            throw new Error("Ususario imcompativel com o eleogio")
        }

        const usersReceiveExists = await usersRepository.findOne(user_receive);

        if(!usersReceiveExists){
            throw new Error("Usuario elogiado não existe");
        }

        const compliments = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receive,
            message
        });

        await complimentsRepository.save(compliments);

        return compliments;
    }
}

export { CreateComplimentsService }