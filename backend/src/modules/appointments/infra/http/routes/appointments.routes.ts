import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointementsRouter = Router();
const appointmentsController = new AppointmentsController();

appointementsRouter.use(ensureAuthenticated);

appointementsRouter.post('/', appointmentsController.create);

export default appointementsRouter;
