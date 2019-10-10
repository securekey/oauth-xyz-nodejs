import * as mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  request: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed
});

export const EntryModel = new mongoose.model('Entry', EntrySchema);
export const PendingTransactionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  entries: [EntrySchema],
  owner: String,
  callback_id: String,
  client_nonce: String,
  server_nonce: String
});

export const PendingTransactionModel = mongoose.model(
  'PendingTransaction',
  PendingTransactionSchema
);
