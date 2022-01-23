import {inject,injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Employees from '@modules/employees/infra/typeorm/models/employees';
import IEmployeesRepository from '../Repositories/IEmployeesRepository';

interface Request {
    taxpayerId: string;
}
@injectable()
class ExcludeEmployeesService{
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository:IEmployeesRepository,

       ){}
        public async execute({
            
            taxpayerId,
        }:Request): Promise<Employees>{
            const check = await this.employeesRepository.findBytaxpayerId(
                taxpayerId,  
            );
            
            if (!check) {
                throw new AppError('Employees does not Exists');
            }
           
            const excludeCustomer:any = this.employeesRepository.delete(taxpayerId)
               
            return excludeCustomer;
        }
}

export default ExcludeEmployeesService;

