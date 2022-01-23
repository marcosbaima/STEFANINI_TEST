import { container } from 'tsyringe';

import IEmployeesRepository from '@modules/employees/Repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

import IUsersRepository from '@modules/users/Repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users';

import IUpdateUsersRepository from '@modules/users/Repositories/IUpdateUsersRepository';
import UsersUpdateRepository from '@modules/users/infra/typeorm/repositories/usersUpdate';

import IUsersTokensRepository from '@modules/users/Repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


import '@modules/users/providers';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',UsersRepository,
);

container.registerSingleton<IUpdateUsersRepository>(
  'UsersUpdateRepository',UsersUpdateRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',UserTokensRepository,
);

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',EmployeesRepository,
);

