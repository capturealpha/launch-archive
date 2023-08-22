import { DeploymentResponseModel } from "@src/data/models/deployment";

export interface AkashApiWrapper {
  listDeployments: () => Promise<DeploymentResponseModel[]>;
}
