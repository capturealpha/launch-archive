import { type DeploymentDataSource } from "@src/data/interfaces/data-sources/deployment-data-source";
import {
  QueryClientImpl,
  QueryDeploymentsRequest,
  QueryDeploymentResponse
} from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";

export class AkashApiDeploymentDataSource implements DeploymentDataSource {
  private readonly rpcEndpoint: string;
  constructor(rpcEndpoint: string | undefined) {
    this.rpcEndpoint = rpcEndpoint || "";
  }

  async getAll(): Promise<QueryDeploymentResponse[]> {
    const rpc = await getRpc(this.rpcEndpoint);
    const request = QueryDeploymentsRequest.fromJSON({});
    const client = new QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if (response?.deployments?.length > 0) {
      return response.deployments;
    }
    return Promise.reject(new Error("No deployments found"));
  }

  async getByOwner(ownerAddress: string): Promise<QueryDeploymentResponse[]> {
    const rpc = await getRpc(this.rpcEndpoint);
    const request = QueryDeploymentsRequest.fromJSON({
      filters: {
        owner: ownerAddress
      }
    });
    const client = new QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if (response?.deployments?.length > 0) {
      return response.deployments;
    }
    return Promise.reject(
      new Error(`No deployments found for owner ${ownerAddress}`)
    );
  }
}
