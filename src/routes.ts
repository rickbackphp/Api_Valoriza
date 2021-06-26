import { Router } from 'express';
import { AuthenticateUsersController } from './controller/AuthenticateUsersController';
import { CreateComplimnetsController } from './controller/CreateComplimentsController';
import { CreateTagsController } from './controller/CreateTagsController';
import { CreateUserController } from './controller/CreateUsersController';
import { ListUsersController } from './controller/ListUsersController';
import { ListUsersReceiveComplimentsController } from './controller/ListUsersReceiveComplimentsController';
import { ListUsersSenderComplimentsController } from './controller/ListUsersSenderComplimentsController';
import { ListTagsController } from './controller/TagsListController';
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';


const router = Router();

const createUsersController = new CreateUserController();
const createTagsController = new CreateTagsController();
const authenticateController = new AuthenticateUsersController();
const createComplimentsController = new CreateComplimnetsController();
const listUsersReceiveComplimentsController = new ListUsersReceiveComplimentsController();
const listUsersSenderComplimentsController = new ListUsersSenderComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users",createUsersController.handle);
router.post("/tags", ensureAuthenticate ,ensureAdmin ,createTagsController.handle);
router.post("/login", authenticateController.handle);
router.post("/compliments", ensureAuthenticate ,createComplimentsController.handle);

router.get("/users/compliments/send", ensureAuthenticate ,listUsersSenderComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticate ,listUsersReceiveComplimentsController.handle);
router.get("/tags", ensureAuthenticate ,listTagsController.handle);
router.get("/users", ensureAuthenticate, listUsersController.handle);

export { router }