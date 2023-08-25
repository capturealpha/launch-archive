import { type DeploymentDataSource } from "../../interfaces/data-sources/deployment-data-source";
import AkashQuery from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";

export class AkashApiDeploymentDataSource implements DeploymentDataSource {
  private readonly rpcEndpoint: string;
  constructor(rpcEndpoint: string | undefined) {
    this.rpcEndpoint = rpcEndpoint || "";
  }

  async getAll(): Promise<AkashQuery.QueryDeploymentResponse[]> {
    const rpc = await getRpc(this.rpcEndpoint);
    const request = AkashQuery.QueryDeploymentsRequest.fromJSON({});
    const client = new AkashQuery.QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if (response?.deployments?.length > 0) {
      return response.deployments;
      // return response.deployments.map((item: { state: string }) => ({
      //   state: item.state
      // }));
      // console.log(response.deployments, response.deployments.length, typeof(response.deployments));
    }
    return Promise.reject(new Error("No deployments found"));
  }
}
