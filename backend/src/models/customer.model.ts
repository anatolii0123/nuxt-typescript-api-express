import { Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  balance: number;
}
