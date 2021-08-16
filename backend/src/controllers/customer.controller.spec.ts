import 'reflect-metadata';
import { expect } from 'chai';
import { CustomerController } from '.';
import { CustomerService } from '../services';

describe('Customer Controller', () => {
  let controller: CustomerController;

  beforeEach(() => {
    controller = new CustomerController(new CustomerService());
  });

  it('should instantiate Customer Controller', () => {
    expect(controller).to.be.instanceOf(CustomerController);
  });
});
