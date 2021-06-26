import { Request, Response } from "express";
import { ListUsersReceiveComplimentsService } from "../services/ListUsersReceiveComplimentsService";

class ListUsersReceiveComplimentsController{
    async handle(request: Request, response: Response){

        const { user_id } = request;

        const listUsersReceiveComplimentsService = new ListUsersReceiveComplimentsService();

        const compliments = await listUsersReceiveComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUsersReceiveComplimentsController }