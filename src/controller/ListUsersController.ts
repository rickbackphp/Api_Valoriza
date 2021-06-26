import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController{
    async handle(resquest: Request, response: Response){
        const listUsersServeice = new ListUsersService();
        const users = await listUsersServeice.execute();

        return response.json(users);
    }
}

export { ListUsersController }