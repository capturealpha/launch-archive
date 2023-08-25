import { Deployment } from "../../entities/deployment";
import { DeploymentRepository } from "../../interfaces/repositories/deployment-repository";
import { GetDeploymentsUseCase } from "../../interfaces/use-cases/deployment/get-deployments";

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
