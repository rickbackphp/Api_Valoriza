import {  Request, Response } from 'express';
import { CreateComplimentsService } from '../services/CreateComplimentsService'


class CreateComplimnetsController{
    async handle(request: Request, response: Response){
        const { tag_id, user_receive, message} = request.body;
        const { user_id } = request

        const createComplimentsService = new CreateComplimentsService();

        const compliments = await createComplimentsService.execute({
            tag_id,
            user_sender: user_id,
            user_receive,
            message
        });

        response.json(compliments);
    }
}

export { CreateComplimnetsController }