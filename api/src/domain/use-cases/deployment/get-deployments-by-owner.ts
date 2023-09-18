import { Deployment } from "@src/domain/entities/deployment";
import { DeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { GetDeploymentsByOwnerUseCase } from "@src/domain/interfaces/use-cases/deployment/get-deployments-by-owner";

export class GetDeploymentsByOwner implements GetDeploymentsByOwnerUseCase {
  deploymentRepository: DeploymentRepository;
  constructor(deploymentRepository: DeploymentRepository) {
    this.deploymentRepository = deploymentRepository;
  }

  async execute(ownerAddress: string): Promise<Deployment[]> {
    const result =
      await this.deploymentRepository.getDeploymentsByOwner(ownerAddress);
    return result;
  }
}
