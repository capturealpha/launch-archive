import { type Deployment } from "@src/domain/entities/deployment";

export interface IListUseCase {
  execute: () => Promise<Deployment[]>;
}
