import { Deployment } from "@src/domain/entities/deployment";
import { IDeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { IListByOwnerUseCase } from "@src/domain/interfaces/use-cases/deployment/list-by-owner";

export class ListByOwner implements IListByOwnerUseCase {
  deploymentRepository: IDeploymentRepository;
  constructor(deploymentRepository: IDeploymentRepository) {
    this.deploymentRepository = deploymentRepository;
  }

  async execute(ownerAddress: string): Promise<Deployment[]> {
    const result = await this.deploymentRepository.listByOwner(ownerAddress);
    return result;
  }
}
