import { type DeploymentResponseModel } from "../../models/deployment";

export interface DeploymentDataSource {
  getAll: () => Promise<DeploymentResponseModel[]>;
}
