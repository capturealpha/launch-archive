import { getRpc } from "@akashnetwork/akashjs/build/rpc";

class DeploymentService {
  constructor(
    public apiVersion: string,
    public rpcEndpoint: string,
    public QueryModule: any,
  ) { 
    apiVersion = apiVersion;
    rpcEndpoint = rpcEndpoint;
    
  }

   async listByOwner(ownerAddress: string) {
    const request = this.QueryModule.QueryDeploymentsRequest.fromJSON({
      filters: {
        owner: ownerAddress
      }
    });
  
    const rpc = await getRpc(this.rpcEndpoint)
    const client = new this.QueryModule.QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if(response.deployments && response.deployments.length) {
      response.deployments.map((deploymentWrapper: any) => {
        const deployment = deploymentWrapper.deployment;
        console.log(deployment, typeof(deployment));
      });
      //console.log(response.deployments, response.deployments.length, typeof(response.deployments));
    }
    //console.log(response, typeof(response));
    return this.QueryModule.QueryDeploymentsResponse.toJSON(response);
  }
}

export default DeploymentService

