import 'reflect-metadata';
import { expect } from 'chai';
import { CustomerService } from './customer.service';
import { Pagination, ICustomer } from '../models/';

describe('Customer Service', () => {
  let customerService: CustomerService;

  beforeEach(() => {
    customerService = new CustomerService();
  });

  it('should add a new customer', async () => {
    const customer = {
      name: 'Ariful Islam',
      balance: 300,
      email: 'abc@gmail.com'
    } as ICustomer;
    const createdCustomer = await customerService.addCustomer(customer);
    expect(createdCustomer).not.to.be.null;
    expect(createdCustomer._id).not.to.be.null;
  });

  it('should add a new customer without balance', async () => {
    const customer = {
      name: 'Shariful Islam',
      email: 'abc@gmail.com'
    } as ICustomer;
    const createdCustomer = await customerService.addCustomer(customer);
    expect(createdCustomer).not.to.be.null;
    expect(createdCustomer._id).not.to.be.null;
  });

  it('should get all customer without pagination', async () => {
    const customers = await customerService.getAllCustomers({} as Pagination);
    expect(customers).not.to.be.null;
  });

  it('should get all customer with pagination', async () => {
    const customers = await customerService.getAllCustomers(
      new Pagination({
        page: 1,
        pageSize: 10
      })
    );
    expect(customers).not.to.be.null;
  });

  it('should test simple async method', async () => {
    const valid = await customerService.testPromise();
    expect(valid).to.be.equal(true);
  });
});
