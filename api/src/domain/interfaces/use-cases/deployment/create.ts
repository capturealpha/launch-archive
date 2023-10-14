import { type Deployment } from "@src/domain/entities/deployment";

export interface ICreateUseCase {
  execute: (deployment: Deployment) => Promise<Deployment>;
}
