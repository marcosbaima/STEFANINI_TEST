import employees from '../infra/typeorm/models/employees';
import IEmployeesDTO from '../dtos/IEmployeesDTO';
export default interface IEmployeesRepository{
    findById(id:string): Promise<employees | undefined>
    findBytaxpayerId(taxpayerId:string): Promise<employees | undefined>
    findByEmail(email:string): Promise<employees | undefined>
    findByMarket(marketplaceId:string): Promise<employees | undefined>
    delete(id:string):Promise<employees | undefined>
  //  find(date:ICreateSubscriptionDTO):Promise<subscription>;
  create(date:IEmployeesDTO): Promise<employees>;
  save(apiowners:employees):Promise<employees>
}
