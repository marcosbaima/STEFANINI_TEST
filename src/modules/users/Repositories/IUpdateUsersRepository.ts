import User from '../infra/typeorm/models/UsersUpdate'
import IUpdateUserDTO from '../dtos/IUpdateUsersDTO'
export default interface IUpdateUsersRepository{
  findById(id:string): Promise<User | undefined>
  findByEmail(email:string): Promise<User | undefined>
  find(date:IUpdateUserDTO):Promise<User>;
  create(date:IUpdateUserDTO): Promise<User>;
  save(user:User):Promise<User>
}
