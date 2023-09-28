import { Deployment } from "@src/domain/entities/deployment";
import { IDeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { IListUseCase } from "@src/domain/interfaces/use-cases/deployment/list";

export class ListDeployments implements IListUseCase {
  deploymentRepository: IDeploymentRepository;
  constructor(deploymentRepository: IDeploymentRepository) {
    this.deploymentRepository = deploymentRepository;
  }

  async execute(): Promise<Deployment[]> {
    const result = await this.deploymentRepository.list();
    return result;
  }
}
