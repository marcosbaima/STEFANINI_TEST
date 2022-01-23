import { getRepository, Repository } from 'typeorm';
import IEmployeesRepository from '@modules/employees/Repositories/IEmployeesRepository';
import IEmployeesDTO from '@modules/employees/dtos/IEmployeesDTO';
import employees from '@modules/employees/infra/typeorm/models/employees';

class EmployeesRepository implements IEmployeesRepository{
    private ormRepository:Repository<employees>;
    constructor(){
        this.ormRepository=getRepository(employees);
    }

    public async findById(id:string): Promise<employees | undefined>{
        const findSubs=await this.ormRepository.findOne({
            where:{id}
        });
        return findSubs;
    }

    public async findBytaxpayerId(taxpayerId:string): Promise<employees | undefined>{
        const findSubs=await this.ormRepository.findOne({
            where:{taxpayerId}
        });
        return findSubs;
    }


    public async findByEmail(email:string): Promise<employees | undefined>{
        
        const findSubs=await this.ormRepository.findOne({
            where:{email}
        });
        return findSubs;
    }
    public async findByMarket(marketplaceId:string): Promise<employees | undefined>{
        const findSubs=await this.ormRepository.findOne({
            where:{marketplaceId}
        });
        return findSubs;
    }
    public async create({

        name,             
        age,
        occupation,
        taxpayerId,

}:IEmployeesDTO):Promise<employees>{
            const subs=this.ormRepository.create({
                name,             
                age,
                occupation,
                taxpayerId,
        
            });

                await this.ormRepository.save(subs);

                return subs;
        }
        public async delete(taxpayerId:string): Promise<any>{

            //@ts-ignore>
            const findSubs=await this.ormRepository.delete({taxpayerId:taxpayerId})
            return findSubs;
        }
        public async save(subs:employees):Promise<employees>{
            await this.ormRepository.save(subs)
            return subs;
        }
        public async find(subs:employees):Promise<employees>{
            await this.ormRepository.find(subs);
            return subs;
        }
}

export default EmployeesRepository;
