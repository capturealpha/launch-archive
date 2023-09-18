import { Deployment } from "@src/domain/entities/deployment";
import { DeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { GetDeploymentsUseCase } from "@src/domain/interfaces/use-cases/deployment/get-deployments";

export class GetDeployments implements GetDeploymentsUseCase {
  deploymentRepository: DeploymentRepository;
  constructor(deploymentRepository: DeploymentRepository) {
    this.deploymentRepository = deploymentRepository;
  }

  async execute(): Promise<Deployment[]> {
    const result = await this.deploymentRepository.getDeployments();
    return result;
  }
}
