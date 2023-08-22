import { AkashApiWrapper } from "@src/data/interfaces/data-sources/akash-api-wrapper";
import { DeploymentResponseModel } from "@src/data/models/deployment";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";

export class AkashApi implements AkashApiWrapper {
  constructor(
    private apiVersion: string,
    private rpcEndpoint: string
  ) {
    this.apiVersion = apiVersion;
    this.rpcEndpoint = rpcEndpoint;
  }

  async listDeployments(): Promise<DeploymentResponseModel[]> {
    const AkashQuery = await import(
      `@akashnetwork/akashjs/build/protobuf/akash/deployment/${this.apiVersion}/query`
    );
    const rpc = await getRpc(this.rpcEndpoint);
    const request = AkashQuery.QueryDeploymentsRequest.fromJSON({});
    const client = new AkashQuery.QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if (response?.deployments?.length > 0) {
      return response.deployments.map((item: { state: string }) => ({
        state: item.state
      }));
      // console.log(response.deployments, response.deployments.length, typeof(response.deployments));
    }
    return Promise.reject(new Error("No deployments found"));
  }
}
