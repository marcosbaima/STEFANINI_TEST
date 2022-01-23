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
class UpdateEmployeesService{
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
            
            if (!check) {
                throw new AppError('Employees does not Exists');
            }
           
            check.name = name;     
            check.age = age;
            check.occupation = occupation;
            check.taxpayerId = taxpayerId;

            const updateEmployees = this.employeesRepository.save(check);

            return updateEmployees
        }
}

export default UpdateEmployeesService;

