import { type Deployment } from "../../../entities/deployment";

export interface GetDeploymentsUseCase {
  execute: (address: string) => Promise<Deployment[]>;
}
