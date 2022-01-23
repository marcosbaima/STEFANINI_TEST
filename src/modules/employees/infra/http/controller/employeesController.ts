import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import  employees from '@modules/employees/infra/typeorm/models/employees';
import CreateEmployeesService from '@modules/employees/service/CreateEmployeesService';
import UpdateEmployeesService from '@modules/employees/service/UpdateEmployeesService';
import ExcludeEmployeesService from '@modules/employees/service/ExcludeEmployeesService';

import {container} from 'tsyringe';

export default class customerController{
    public async create(request:Request, response:Response):Promise<Response> {
    
        try{ 
            const {           
                name,      
                age,
                occupation,
                taxpayerId,
            } = request.body;
            const create = container.resolve(CreateEmployeesService);
    
            const apiowner = await create.execute({
                name,      
                age,
                occupation,
                taxpayerId,
            });

            return response.json(apiowner);
            
            } catch (err) {
                return response.status(400).json({error:err});
            }
    }
    public async update(request:Request, response:Response):Promise<Response> {
    
        try{ 
            const {           
                name,      
                age,
                occupation,
                taxpayerId,
            } = request.body;
            const update = container.resolve(UpdateEmployeesService);
    
            const apiowner = await update.execute({
                name,      
                age,
                occupation,
                taxpayerId,
            });

            return response.json(apiowner);

            } catch (err) {
                return response.status(400).json({error:err});
            }
    }
    public async show(request:Request, response:Response):Promise<any> {

        const params:any = request.query.taxpayerId;

        if(params){
            var getEmployee = await getRepository(employees).findOne({taxpayerId:params})

            return response.status(200).json(getEmployee);
        }

        var getEmployees = await getRepository(employees).find();

        return response.status(200).json(getEmployees);

    }
    public async exclude(request:Request, response:Response):Promise<any> {
    
        try{ 
            const            
                params:any
             = request.params.id;
            
            const exclude = container.resolve(ExcludeEmployeesService);
    
            const apiowner = await exclude.execute({
                taxpayerId:params,
            });

            return response.json(apiowner);

            } catch (err) {
                return response.status(400).json({error:err});
            }
    } 
}
  
