import * as Joi from '@hapi/joi';

import { ICustomer } from '../models';

export const validateUpdateCustomer = (customer: ICustomer): Joi.ValidationResult => {
  const schema = Joi.object<ICustomer>({
    name: Joi.string()
      .optional()
      .min(3),
    email: Joi.string()
      .optional()
      .email(),
    balance: Joi.number().optional()
  });

  return schema.validate(customer);
};
