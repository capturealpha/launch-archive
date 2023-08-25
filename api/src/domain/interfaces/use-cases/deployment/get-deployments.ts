import { type Deployment } from "../../../entities/deployment";

export interface GetDeploymentsUseCase {
  execute: () => Promise<Deployment[]>;
}
