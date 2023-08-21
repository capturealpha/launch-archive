import { DeploymentResponseModel } from "@src/data/models/deployment";

export interface AkashApiWrapper {
  find: (query: object) => Promise<DeploymentResponseModel[]>;
  insertOne: (doc: unknown) => Promise<unknown>;
}
