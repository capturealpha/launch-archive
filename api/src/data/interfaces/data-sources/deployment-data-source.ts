import { QueryDeploymentResponse } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { MsgCreateDeploymentResponse } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg";

export interface IDeploymentDataSource {
  create: () => Promise<MsgCreateDeploymentResponse>;
  list: () => Promise<QueryDeploymentResponse[]>;
  listByOwner: (ownerAddress: string) => Promise<QueryDeploymentResponse[]>;
}
