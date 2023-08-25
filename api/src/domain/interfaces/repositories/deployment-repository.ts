import { type Deployment } from "../../entities/deployment";

export interface DeploymentRepository {
  getDeployments: () => Promise<Deployment[]>;
}
