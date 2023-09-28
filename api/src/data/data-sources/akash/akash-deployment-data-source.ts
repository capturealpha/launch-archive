import { type IDeploymentDataSource } from "@src/data/interfaces/data-sources/deployment-data-source";
import {
  QueryClientImpl,
  QueryDeploymentsRequest,
  QueryDeploymentResponse
} from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import {
  MsgCreateDeployment,
  MsgCreateDeploymentResponse
} from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  getAkashTypeRegistry,
  getTypeUrl
} from "@akashnetwork/akashjs/build/stargate/index";
import { SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";

export class AkashApiDeploymentDataSource implements IDeploymentDataSource {
  private readonly rpcEndpoint: string;
  private readonly mnemonic: string;
  constructor(rpcEndpoint: string | undefined, mnemonic: string | undefined) {
    this.rpcEndpoint = rpcEndpoint || "";
    this.mnemonic = mnemonic || "";
  }

  async create(): Promise<MsgCreateDeploymentResponse> {
    const response = await axios.get(`${this.rpcEndpoint}/blocks/latest`);
    const data = response.data;

    const dseq = parseInt(data.block.header.height);

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic, {
      prefix: "akash"
    });

    // get first account
    const [account] = await wallet.getAccounts();

    // Use the encode method for the message to wrap the data
    const message = MsgCreateDeployment.fromPartial({
      id: {
        dseq: dseq,
        owner: account.address
      }
    });

    const msgAny = {
      typeUrl: getTypeUrl(MsgCreateDeployment),
      value: message
    };

    const myRegistry = new Registry(getAkashTypeRegistry());

    const client = await SigningStargateClient.connectWithSigner(
      this.rpcEndpoint,
      wallet,
      {
        registry: myRegistry
      }
    );

    const fee = {
      amount: [
        {
          denom: "uakt",
          amount: "5000"
        }
      ],
      gas: "800000"
    };

    const signedMessage = await client.signAndBroadcast(
      account.address,
      [msgAny],
      fee,
      "create deployment"
    );

    console.log(signedMessage);

    return Promise.reject(new Error(`Not implemented yet`));
  }

  async list(): Promise<QueryDeploymentResponse[]> {
    const rpc = await getRpc(this.rpcEndpoint);
    const request = QueryDeploymentsRequest.fromJSON({});
    const client = new QueryClientImpl(rpc);
    const response = await client.Deployments(request);
    if (response?.deployments?.length > 0) {
      return response.deployments;
    }
    return Promise.reject(new Error("No deployments found"));
  }

  async listByOwner(ownerAddress: string): Promise<QueryDeploymentResponse[]> {
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
