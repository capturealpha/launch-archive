import { Deployment } from "@src/domain/entities/deployment";
import { IDeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { ICreateUseCase } from "@src/domain/interfaces/use-cases/deployment/create";

export class CreateDeployment implements ICreateUseCase {
  deploymentRepository: IDeploymentRepository;
  constructor(deploymentRepository: IDeploymentRepository) {
    this.deploymentRepository = deploymentRepository;
  }

  async execute(deployment: Deployment): Promise<Deployment> {
    const result = await this.deploymentRepository.create(deployment);
    return result;
  }
}
