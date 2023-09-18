import { type Deployment } from "../../../entities/deployment";

export interface GetDeploymentsByOwnerUseCase {
  execute: (ownerAddress: string) => Promise<Deployment[]>;
}
