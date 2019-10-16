import * as mongoose from 'mongoose';
import { DisplaySchema } from './displayModel';
import { InteractSchema } from './interactModel';
import { UserRequestSchema } from './userModel';
import { ResourceSchema } from './resourcesModel';
import { HandleSetSchema, HandleSchema } from './handleModel';

export const TransactionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  display: DisplaySchema,
  interact: InteractSchema,
  user: UserRequestSchema,
  resources: [ResourceSchema],
  handles: HandleSetSchema,
  access_token: HandleSchema,
  status: {
    type: String,
    enum: ['new', 'issued', 'authorized', 'waiting', 'denied'],
    default: 'new'
  }
});

export const TransactionModel = mongoose.model(
  'Transaction',
  TransactionSchema
);
