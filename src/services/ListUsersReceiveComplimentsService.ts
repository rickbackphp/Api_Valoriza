import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

class ListUsersReceiveComplimentsService{
    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                user_receive: user_id
            },
            relations: ["userSender", "userReceive", "tag"]
        })

        return compliments;
    }
}

export{ ListUsersReceiveComplimentsService }