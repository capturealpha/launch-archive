import Long from "long";
import { type IDeploymentDataSource } from "@src/data/interfaces/data-sources/deployment-data-source";
import { type Deployment } from "@src/domain/entities/deployment";
import { type IDeploymentRepository } from "@src/domain/interfaces/repositories/deployment-repository";
import { base64FromBytes } from "../../../../shared/utils/encode";

export class DeploymentRepositoryImpl implements IDeploymentRepository {
  deploymentDataSource: IDeploymentDataSource;

  constructor(deploymentDataSource: IDeploymentDataSource) {
    this.deploymentDataSource = deploymentDataSource;
  }

  async create(deployment: Deployment): Promise<Deployment> {
    const res = await this.deploymentDataSource.create();
    console.log(res);
    return {
      state: 0,
      owner: deployment.owner,
      dseq: 0,
      version: "",
      createdAt: Date.now()
    };
  }

  async list(): Promise<Deployment[]> {
    const deployments = await this.deploymentDataSource.list();
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

  async listByOwner(ownerAddress: string): Promise<Deployment[]> {
    const deployments =
      await this.deploymentDataSource.listByOwner(ownerAddress);
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
