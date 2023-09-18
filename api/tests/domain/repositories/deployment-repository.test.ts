import { DeploymentDataSource } from "../../../src/data/interfaces/data-sources/deployment-data-source";
import AkashQuery from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import AkashDeployment from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deployment";
import { DeploymentRepository } from "../../../src/domain/interfaces/repositories/deployment-repository";
import { DeploymentRepositoryImpl } from "../../../src/domain/repositories/deployment-repository";
import Long from "long";
import { Deployment } from "@src/domain/entities/deployment";
import { base64FromBytes } from "../../../../shared/utils/encode";

class MockDeploymentDataSource implements DeploymentDataSource {
  getAll(): Promise<AkashQuery.QueryDeploymentResponse[]> {
    throw new Error("Method not implemented.");
  }
  getByOwner(
    ownerAddress: string
  ): Promise<AkashQuery.QueryDeploymentResponse[]> {
    throw new Error(`Method not implemented. ${ownerAddress}`);
  }
}

describe("Deployment Repository", () => {
  let mockDeploymentDataSource: MockDeploymentDataSource;
  let deploymentRepository: DeploymentRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDeploymentDataSource = new MockDeploymentDataSource();
    deploymentRepository = new DeploymentRepositoryImpl(
      mockDeploymentDataSource
    );
  });

  describe("getAllDeployments", () => {
    test("should return data", async () => {
      console.log(AkashQuery, AkashDeployment);
      const expectedDatasourceData = [
        {
          $type: "akash.deployment.v1beta3.QueryDeploymentResponse" as const,
          deployment: {
            $type: "akash.deployment.v1beta3.Deployment" as const,
            deploymentId: {
              $type: "akash.deployment.v1beta3.DeploymentID" as const,
              owner: "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q4",
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
          owner: "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q4",
          dseq: Long.ZERO.toNumber(),
          state: 0,
          version: base64FromBytes(new Uint8Array()),
          createdAt: Long.ZERO.toNumber()
        }
      ];
      jest
        .spyOn(mockDeploymentDataSource, "getAll")
        .mockImplementation(() => Promise.resolve(expectedDatasourceData));
      const result = await deploymentRepository.getDeployments();
      expect(result).toStrictEqual(expectedRepositoryData);
    });
  });
});
