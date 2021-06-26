import { Request, Response } from "express";
import { ListUsersSenderComplimentsService } from "../services/ListUsersSenderComplimentsService";



class ListUsersSenderComplimentsController{
    async handle(request: Request, response: Response){

        const { user_id } = request;

        const listUsersSenderComplimentsService = new ListUsersSenderComplimentsService();

        const compliments = await listUsersSenderComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUsersSenderComplimentsController }