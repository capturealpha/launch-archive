import { DeploymentDataSource } from "../../../src/data/interfaces/data-sources/deployment-data-source";
import AkashQuery from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { DeploymentRepository } from "../../../src/domain/interfaces/repositories/deployment-repository";
import { DeploymentRepositoryImpl } from "../../../src/domain/repositories/deployment-repository";

class MockDeploymentDataSource implements DeploymentDataSource {
  getAll(): Promise<AkashQuery.QueryDeploymentResponse[]> {
    throw new Error("Method not implemented.");
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
      const expectedData = [
        {
          $type: "akash.deployment.v1beta3.QueryDeploymentResponse" as const,
          deployment: undefined,
          groups: [],
          escrowAccount: undefined
        }
      ];
      jest
        .spyOn(mockDeploymentDataSource, "getAll")
        .mockImplementation(() => Promise.resolve(expectedData));
      const result = await deploymentRepository.getDeployments();
      expect(result).toBe(expectedData);
    });
  });
});
