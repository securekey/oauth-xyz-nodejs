import * as mongoose from "mongoose";
import { ClientSchema, ClientRequest } from "./clientModel";
import { InteractSchema } from "./interactModel";
import { UserSchema } from "./userModel";
import { ResourceSchema } from "./resourcesModel";
import { HandleSetSchema, HandleSchema } from "./handleModel";

export const TransactionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  client: ClientSchema,
  interact: InteractSchema,
  user: UserSchema,
  resource: ResourceSchema,
  handles: HandleSetSchema,
  access_token: HandleSchema,
  status: {
    type: String,
    enum: ["new", "issued", "authorized", "waiting", "denied"],
    default: "new"
  }
});

export const TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
