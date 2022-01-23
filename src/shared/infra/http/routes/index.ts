import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routers';

import employeesRouter from '@modules/employees/infra/http/routes/employees.route';

import profileRouter from '@modules/users/infra/http/routes/profile.routers';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/users', usersRouter);

/*         ('/update/{UserID}') */
routes.use('/user/update', usersRouter);


routes.use('/adm/list/user', usersRouter);

routes.use('/profile/update', profileRouter);

routes.use('/profile/list', profileRouter);

/*
*********Public routes**************
*/

routes.use('/employees', employeesRouter)


export default routes;