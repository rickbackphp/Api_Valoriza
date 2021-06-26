import { Request, Response } from 'express'
import { CreateUsersService } from '../services/CreateUsersService';

class CreateUserController {

    async handle(request: Request, response: Response) {

        const { name, email, admin, password } = request.body;

        const createUsersService = new CreateUsersService();

        const user = await createUsersService.execute({ name, email, admin, password });

        return response.json(user);
    }
}

export { CreateUserController }