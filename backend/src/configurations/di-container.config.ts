import 'reflect-metadata';
import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-restify-utils';

import { Services } from '../constants/types';
import { CustomerController } from '../controllers';
import { CustomerService } from '../services';

/** load everything needed to the Container */
export const getConfiguredDIContainer = () => {
  const container = new Container();

  // load controllers here
  container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(CustomerController)
    .inRequestScope()
    .whenTargetNamed('CustomerController');

  // load services here
  container
    .bind<CustomerService>(Services.CustomerService)
    .to(CustomerService)
    .inRequestScope();

  return container;
};
