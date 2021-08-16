import { Schema, model } from 'mongoose';
import * as timestamp from 'mongoose-timestamp';

import { ICustomer } from '../models';

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

CustomerSchema.plugin(timestamp);

export const Customer = model<ICustomer>('Customer', CustomerSchema);
