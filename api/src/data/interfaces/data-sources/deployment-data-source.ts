import AkashQuery from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";

export interface DeploymentDataSource {
  getAll: () => Promise<AkashQuery.QueryDeploymentResponse[]>;
  getByOwner: (
    ownerAddress: string
  ) => Promise<AkashQuery.QueryDeploymentResponse[]>;
}
