import { type Deployment } from "@src/domain/entities/deployment";

export interface IDeploymentRepository {
  create: (deployment: Deployment) => Promise<Deployment>;
  list: () => Promise<Deployment[]>;
  listByOwner: (ownerAddress: string) => Promise<Deployment[]>;
}
