import { getRpc } from '@akashnetwork/akashjs/build/rpc'

class DeploymentService {
  constructor (
    public apiVersion: string,
    public rpcEndpoint: string,
    public QueryModule: any
  ) {
    this.apiVersion = apiVersion
    this.rpcEndpoint = rpcEndpoint
    this.QueryModule = QueryModule
  }

  async listByOwner (ownerAddress: string): Promise<any> {
    const request = this.QueryModule.QueryDeploymentsRequest.fromJSON({
      filters: {
        owner: ownerAddress
      }
    })

    const rpc = await getRpc(this.rpcEndpoint)
    const client = new this.QueryModule.QueryClientImpl(rpc)
    const response = await client.Deployments(request)
    if (response?.deployments?.length > 0) {
      response.deployments.map((deploymentWrapper: any) => {
        const deployment = deploymentWrapper.deployment
        console.log(deployment, typeof (deployment))
        return deployment
      })
      // console.log(response.deployments, response.deployments.length, typeof(response.deployments));
    }
    // console.log(response, typeof(response));
    return this.QueryModule.QueryDeploymentsResponse.toJSON(response)
  }
}

export default DeploymentService
