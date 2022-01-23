
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/models/Users';
import IUsersRepository from '../Repositories/IUsersRepository';
import { injectable, inject} from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
interface Request {
  user_id:string;
  name: string;
  email: string;
  groupsId:string;
  old_password?:string;
  password?:string;
  powerUser:boolean;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider,

    ){}
  public async execute({ user_id, name, email,groupsId,password,old_password,powerUser }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail=  await this.usersRepository.findByEmail(email)

    if (userWithUpdateEmail && userWithUpdateEmail.id != user_id){
      throw new AppError('E-mail already in use')
    }

    user.name= name;
    user.email= email;
    user.groupsId=groupsId;
    user.powerUser= powerUser;

    if (password && !old_password){
      throw new AppError('You need to inform the old password to set  a new password')
    }

    if (password && old_password){
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if(!checkOldPassword){
        throw new AppError('old_password does not match.')
      }
      const hashedPassword = await this.hashProvider.generateHash(password);
      user.password = hashedPassword

    }


    return this.usersRepository.save(user);


  }
}

export default UpdateProfile ;
