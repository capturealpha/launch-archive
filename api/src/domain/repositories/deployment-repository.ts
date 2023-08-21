import { type DeploymentDataSource } from "../../data/interfaces/data-sources/deployment-data-source";
import { type Deployment } from "../entities/deployment";
import { type DeploymentRepository } from "../interfaces/repositories/deployment-repository";

export class DeploymentRepositoryImpl implements DeploymentRepository {
  deploymentDataSource: DeploymentDataSource;

  constructor(deploymentDataSource: DeploymentDataSource) {
    this.deploymentDataSource = deploymentDataSource;
  }

  async getDeployments(): Promise<Deployment[]> {
    const deployments = await this.deploymentDataSource.getAll();
    const res: Deployment[] = [];
    deployments.forEach((deployment) => {
      res.push({
        state: deployment.state
      });
    });
    return res;
  }
}
