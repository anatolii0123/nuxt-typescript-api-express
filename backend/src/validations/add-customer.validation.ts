import * as Joi from '@hapi/joi';

import { ICustomer } from '../models';

export const validateAddCustomer = (customer: ICustomer): Joi.ValidationResult => {
  const schema = Joi.object<ICustomer>({
    name: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .required()
      .email(),
    balance: Joi.number().optional()
  });

  return schema.validate(customer);
};
