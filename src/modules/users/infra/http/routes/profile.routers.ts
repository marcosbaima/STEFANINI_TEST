import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthticated from '../middlewares/ensureAuthenticate';

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(ensureAuthticated)

profileRouter.put('/',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:Joi.string(),
    email:Joi.string().email(),
    //ownersId:Joi.string().uuid().allow(null),
    groupsId:Joi.string().uuid(),
    //branchsId:Joi.string().uuid().allow(null),
    powerUser:Joi.string().allow(null),
    old_password:Joi.string(),
    password: Joi.when('old_password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
    password_confirmation: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('password')).required(),
    }),
  }),
}),profileController.update);

profileRouter.get('/',profileController.show);
export default profileRouter
