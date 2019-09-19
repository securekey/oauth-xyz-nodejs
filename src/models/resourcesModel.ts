export class ResourceFull {
  actions: String[];
  locations: String[];
  data: String[];
}

export class Resources {
  resources: (ResourceFull | String)[]; // Array of objects or handles
}
