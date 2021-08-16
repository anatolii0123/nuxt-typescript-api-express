import { Request } from 'restify';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { injectable, inject } from 'inversify';
import { Controller, Get, Post, interfaces, Put, Delete } from 'inversify-restify-utils';

import { ICustomer, Pagination } from '../models';
import { CustomerService } from '../services';
import { Services } from '../constants/types';
import { validateAddCustomer, validateUpdateCustomer } from '../validations';

@Controller('/api/customer')
@injectable()
export class CustomerController implements interfaces.Controller {
  constructor(@inject(Services.CustomerService) private customerService: CustomerService) {}

  /**
   * Get All customer by pagination
   * @param req
   */
  @Get('/list')
  public async getAllPaginatedCustomer(req: Request) {
    try {
      const params = new Pagination(req.query);
      const customers = await this.customerService.getAllPaginatedCustomers(params);
      return customers;
    } catch (error) {
      return new NotFoundError(error);
    }
  }

  /**
   * Add a new customer
   * @param req
   * @description the *req.body* object need to have name, email, balance
   */
  @Post('/add')
  public async addCustomer(req: Request) {
    try {
      const { error } = validateAddCustomer(req.body);
      if (error) {
        return new BadRequestError(error);
      }
      const customer = req.body as ICustomer;
      const createdCustomer = await this.customerService.addCustomer(customer);
      return createdCustomer;
    } catch (error) {
      return new BadRequestError(error);
    }
  }

  /**
   * Update customer By Id
   * @param req
   * @description the *req.body* object need to have any of these name, email, balance
   * and the *req.params* should have *id* as customerId
   */
  @Put('/update/:id')
  public async updateCustomer(req: Request) {
    try {
      console.log('customer: ', req.body);
      const customerId = req.params.id as string;
      if (!customerId) {
        return new NotFoundError();
      }
      const { error } = validateUpdateCustomer(req.body);
      if (error) {
        return new BadRequestError(error);
      }
      const customer = req.body as ICustomer;
      const updatedCustomer = await this.customerService.updateCustomer(customer, customerId);
      return updatedCustomer;
    } catch (error) {
      return new BadRequestError(error);
    }
  }

  /**
   * Delete customer By Id
   * @param req
   * @description the *req.params* should have customer ID
   */
  @Delete('/delete/:id')
  public async deleteCustomer(req: Request) {
    try {
      const customerId = req.params.id as string;
      if (!customerId) {
        return new NotFoundError();
      }
      const deletedCustomer = await this.customerService.deleteCustomer(customerId);
      return deletedCustomer;
    } catch (error) {
      return new BadRequestError(error);
    }
  }
}
