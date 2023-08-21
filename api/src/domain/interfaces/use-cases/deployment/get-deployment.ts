import { type Deployment } from "../../../entities/deployment";

export interface GetDeploymentUseCase {
  execute: (address: string) => Promise<Deployment[]>;
}
