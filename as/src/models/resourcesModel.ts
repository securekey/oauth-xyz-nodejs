/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import * as mongoose from 'mongoose';

export const ResourceSchema = new mongoose.Schema({
  actions: [String],
  locations: [String],
  datatypes: [String]
});

export const ResourcesSchema = new mongoose.Schema({
  handle: String,
  resources: [ResourceSchema]
});
export const ResourceModel = mongoose.model('Resource', ResourceSchema);

export const ResourcesModel = mongoose.model('Resources', ResourcesSchema);

export class ResourceRequest {
  actions: String[];
  locations: String[];
  datatypes: String[];

  constructor(Obj: any) {
    this.actions = Obj.actions;
    this.locations = Obj.locations;
    this.datatypes = Obj.datatypes;
  }

  public toSchema() {
    var resource = new ResourceModel({
      actions: this.actions,
      locations: this.locations,
      datatypes: this.datatypes
    });

    return resource;
  }
}
