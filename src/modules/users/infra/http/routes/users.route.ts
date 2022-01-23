import { Router, Request } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { getRepository } from 'typeorm';

import userController from '@modules/users/infra/http/controllers/UsersController'
import ensureAuthenticaated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import users from '@modules/users/infra/typeorm/models/Users';

const usersRouter = Router();
//usersRouter.use(paginate.middleware(10, 50));

const UserController= new userController();



  // Create user
  usersRouter.post('/',UserController.create)


  // List users
  usersRouter.get('/',ensureAuthenticaated, async (req: Request, response) => {

    const id = req.query.id;

    const user= await getRepository(users).find({where:{id:id }})

    const pageCount = Math.ceil(user.length / 10);

    const {page,limit} = req.query

    // @ts-ignore
    let pages = parseInt(page);

    if (!pages) { pages = 1;}
    if (pages > pageCount) {
      pages = pageCount
    }
  response.json({
    "page": pages,
    "pageCount": pageCount,
    "limit":limit,
    "users": user.slice(pages * 10 - 10, pages * 10)
  });
    //return response.json(await getRepository(users).find());

  });

  usersRouter.put('/', ensureAuthenticaated,celebrate({
    [Segments.BODY]: Joi.object().keys({
      name:Joi.string(),
      email:Joi.string().email(),
      ownersId:Joi.string().uuid().allow(null),
      groupsId:Joi.string().uuid(),
      branchsId:Joi.string().uuid().allow(null),
      powerUser:Joi.string().allow(null),
    }),

  }),UserController.update)

export default usersRouter;
