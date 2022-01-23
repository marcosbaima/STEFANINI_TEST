import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticaated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import employeesController from '../controller/employeesController';

const EmployeesRouter = Router();
EmployeesRouter.use(ensureAuthenticaated);

const CustomerController = new employeesController()


EmployeesRouter.post('/',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),            
    age: Joi.string().required(),
    occupation:Joi.string().required(),
    taxpayerId:Joi.string().required(),
    
  }),
}),CustomerController.create);

EmployeesRouter.delete('/taxpayerid/:id',celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id:Joi.string().required(),
  }),
}),CustomerController.exclude);

EmployeesRouter.get('/',CustomerController.show);

EmployeesRouter.put('/',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),            
    age: Joi.string().required(),
    occupation:Joi.string().required(),
    taxpayerId:Joi.string().required(),
    
  }),
}),CustomerController.update);


export default EmployeesRouter;
