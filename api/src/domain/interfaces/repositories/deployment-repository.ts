import { type Deployment } from "@src/domain/entities/deployment";

export interface DeploymentRepository {
  getDeployments: () => Promise<Deployment[]>;
  getDeploymentsByOwner: (ownerAddress: string) => Promise<Deployment[]>;
}
