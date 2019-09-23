import * as mongoose from "mongoose";

export const ResourceSchema = new mongoose.Schema({
  actions: [String],
  locations: [String],
  data: [String]
});

const Resource = mongoose.model("Resource", ResourceSchema);

export class ResourceRequest {
  actions: String[];
  locations: String[];
  data: String[];

  constructor(Obj: any) {
    this.actions = Obj.actions;
    this.locations = Obj.locations;
    this.data = Obj.data;
  }

  public toSchema() {
    var resource = new Resource({
      actions: this.actions,
      locations: this.locations,
      data: this.data
    });

    return resource;
  }
}
