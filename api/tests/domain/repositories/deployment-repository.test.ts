import { DeploymentDataSource } from "../../../src/data/interfaces/data-sources/deployment-data-source";
import { Deployment } from "../../../src/domain/entities/deployment";
import { DeploymentRepository } from "../../../src/domain/interfaces/repositories/deployment-repository";
import { DeploymentRepositoryImpl } from "../../../src/domain/repositories/deployment-repository";

class MockDeploymentDataSource implements DeploymentDataSource {
  getAll(): Promise<Deployment[]> {
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
          state: "1"
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
