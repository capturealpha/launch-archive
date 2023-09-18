import Long from "long";
import { type DeploymentDataSource } from "@src/data/interfaces/data-sources/deployment-data-source";
import { type Deployment } from "@src/domain/entities/deployment";
import { type DeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { base64FromBytes } from "../../../../shared/utils/encode";

export class DeploymentRepositoryImpl implements DeploymentRepository {
  deploymentDataSource: DeploymentDataSource;

  constructor(deploymentDataSource: DeploymentDataSource) {
    this.deploymentDataSource = deploymentDataSource;
  }

  async getDeployments(): Promise<Deployment[]> {
    const deployments = await this.deploymentDataSource.getAll();
    const res: Deployment[] = [];
    deployments.forEach((deployment) => {
      console.log(deployment.deployment);
      res.push({
        state: deployment.deployment?.state || 0,
        owner: deployment.deployment?.deploymentId?.owner || "",
        dseq:
          deployment.deployment?.deploymentId?.dseq.toNumber() ||
          Long.ZERO.toNumber(),
        version: base64FromBytes(
          deployment.deployment?.version || new Uint8Array()
        ),
        createdAt: deployment.deployment?.createdAt.toNumber() || 0
      });
    });
    return res;
  }

  async getDeploymentsByOwner(ownerAddress: string): Promise<Deployment[]> {
    const deployments =
      await this.deploymentDataSource.getByOwner(ownerAddress);
    const res: Deployment[] = [];
    deployments.forEach((deployment) => {
      res.push({
        state: deployment.deployment?.state || 0,
        owner: deployment.deployment?.deploymentId?.owner || "",
        dseq:
          deployment.deployment?.deploymentId?.dseq.toNumber() ||
          Long.ZERO.toNumber(),
        version: base64FromBytes(
          deployment.deployment?.version || new Uint8Array()
        ),
        createdAt: deployment.deployment?.createdAt.toNumber() || 0
      });
    });
    return res;
  }
}
