import { IDeploymentDataSource } from "../../../src/data/interfaces/data-sources/deployment-data-source";
import AkashQuery from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
//import AkashDeployment from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deployment";
import { MsgCreateDeploymentResponse } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg";
import { IDeploymentRepository } from "../../../src/domain/interfaces/repositories/deployment-repository";
import { DeploymentRepositoryImpl } from "../../../src/domain/repositories/deployment-repository";
import Long from "long";
import { Deployment } from "@src/domain/entities/deployment";
import { base64FromBytes } from "../../../../shared/utils/encode";

const deploymentOwner = "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q4";
const expectedDatasourceData = [
  {
    $type: "akash.deployment.v1beta3.QueryDeploymentResponse" as const,
    deployment: {
      $type: "akash.deployment.v1beta3.Deployment" as const,
      deploymentId: {
        $type: "akash.deployment.v1beta3.DeploymentID" as const,
        owner: deploymentOwner,
        dseq: Long.ZERO
      },
      state: 0 as number,
      version: new Uint8Array(),
      createdAt: Long.ZERO
    },
    groups: [],
    escrowAccount: undefined
  }
];
const expectedRepositoryData: Deployment[] = [
  {
    owner: deploymentOwner,
    dseq: Long.ZERO.toNumber(),
    state: 0,
    version: base64FromBytes(new Uint8Array()),
    createdAt: Long.ZERO.toNumber()
  }
];

class MockDeploymentDataSource implements IDeploymentDataSource {
  create(): Promise<MsgCreateDeploymentResponse> {
    throw new Error(`Method not implemented.`);
  }
  list(): Promise<AkashQuery.QueryDeploymentResponse[]> {
    throw new Error("Method not implemented.");
  }
  listByOwner(
    ownerAddress: string
  ): Promise<AkashQuery.QueryDeploymentResponse[]> {
    throw new Error(`Method not implemented. ${ownerAddress}`);
  }
}

describe("Deployment Repository", () => {
  let mockDeploymentDataSource: MockDeploymentDataSource;
  let deploymentRepository: IDeploymentRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDeploymentDataSource = new MockDeploymentDataSource();
    deploymentRepository = new DeploymentRepositoryImpl(
      mockDeploymentDataSource
    );
  });

  describe("listAllDeployments", () => {
    test("should return data", async () => {
      jest
        .spyOn(mockDeploymentDataSource, "list")
        .mockImplementation(() => Promise.resolve(expectedDatasourceData));
      const result = await deploymentRepository.list();
      expect(result).toStrictEqual(expectedRepositoryData);
    });
  });

  describe("listDeploymentsByOwner", () => {
    test("should return data", async () => {
      jest
        .spyOn(mockDeploymentDataSource, "listByOwner")
        .mockImplementation(() => Promise.resolve(expectedDatasourceData));
      const result = await deploymentRepository.listByOwner(deploymentOwner);
      expect(result).toStrictEqual(expectedRepositoryData);
    });
  });
});
