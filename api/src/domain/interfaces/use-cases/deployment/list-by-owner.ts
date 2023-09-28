import { type Deployment } from "../../../entities/deployment";

export interface IListByOwnerUseCase {
  execute: (ownerAddress: string) => Promise<Deployment[]>;
}
