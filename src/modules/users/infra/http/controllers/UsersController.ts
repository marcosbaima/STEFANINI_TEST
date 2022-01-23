import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/service/CreateUserService'
import UpdateUserService from '@modules/users/service/UpdateUsersService'
//import { classToClass } from 'class-transformer'

export default class UsersController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password
    })


    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const user_id:any = request.query.id;
    //console.log(user_id)
    const { name, email,groupsId,powerUser} = request.body;

    const updateProfile = container.resolve(UpdateUserService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      groupsId,
      powerUser
    })

    return response.json(user)
  }
}
