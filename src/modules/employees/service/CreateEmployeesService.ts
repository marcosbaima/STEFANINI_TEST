import {inject,injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Employees from '@modules/employees/infra/typeorm/models/employees';
import IEmployeesRepository from '../Repositories/IEmployeesRepository';

interface Request {
    name:string;             
    age:string;
    occupation:string;
    taxpayerId: string;
}
@injectable()
class CreateEmployeesService{
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository:IEmployeesRepository,

       ){}
        public async execute({
            name,      
            age,
            occupation,
            taxpayerId,
        }:Request): Promise<Employees>{
            const check = await this.employeesRepository.findBytaxpayerId(
                taxpayerId,  
            );
            
            if (check) {
                throw new AppError('Employees Exists');
            }
           
            const Createcustomer = this.employeesRepository.create({
                name,      
                age,
                occupation,
                taxpayerId,
            });

            return Createcustomer;
        }
}

export default CreateEmployeesService;

