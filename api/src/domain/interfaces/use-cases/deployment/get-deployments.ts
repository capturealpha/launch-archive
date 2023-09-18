import { type Deployment } from "@src/domain/entities/deployment";

export interface GetDeploymentsUseCase {
  execute: () => Promise<Deployment[]>;
}
