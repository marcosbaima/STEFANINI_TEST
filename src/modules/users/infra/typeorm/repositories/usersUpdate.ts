import { getRepository, Repository } from 'typeorm';
import IUsersUpdateRepository from '@modules/users/Repositories/IUpdateUsersRepository';
import  IUpdateUserDTO from '@modules/users/dtos/IUpdateUsersDTO';
import User from '@modules/users/infra/typeorm/models/UsersUpdate';

class UserUpdateRepository implements IUsersUpdateRepository {
  private ormRepository:Repository<User>;
  constructor(){
    this.ormRepository=getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const findUsers = await this.ormRepository.findOne({
      where: { id },
    });

    return findUsers;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const findUsers = await this.ormRepository.findOne({
      where: { email },
    });

    return findUsers;
  }

  public async create({ name,email,groupsId,powerUser}:IUpdateUserDTO):Promise<User>{
    const user=this.ormRepository.create({name,email,groupsId,powerUser});

    await this.ormRepository.save(user);

    return user;
  }
  public async save(user:User):Promise<User>{
    await this.ormRepository.save(user)
    return user;
  }

  public async find(user:User):Promise<User>{

    await this.ormRepository.find(user);

    return user;


  }
}

export default UserUpdateRepository;
