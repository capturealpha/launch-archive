import request from "supertest";
import { Deployment } from "../../src/domain/entities/deployment";
import { GetDeploymentUseCase } from "../../src/domain/interfaces/use-cases/deployment/get-deployment";
import DeploymentRouter from "../../src/routers/deployment-router";
import server from "../../src/server";

class MockGetDeploymentUseCase implements GetDeploymentUseCase {
  execute(): Promise<Deployment[]> {
    throw new Error("Method not implemented.");
  }
}

describe("Deployment Router", () => {
  let mockGetDeploymentUseCase: GetDeploymentUseCase;

  beforeAll(() => {
    mockGetDeploymentUseCase = new MockGetDeploymentUseCase();
    server.use("/deployment", DeploymentRouter(mockGetDeploymentUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /deployment", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = [{state: "1"}];
      jest.spyOn(mockGetDeploymentUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get("/deployment");

      expect(response.status).toBe(200);
      expect(mockGetDeploymentUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /deployment returns 500 on use case error", async () => {
      jest.spyOn(mockGetDeploymentUseCase, "execute").mockImplementation(() => Promise.reject(Error("Error fetching data" )));
      const response = await request(server).get("/deployment");
      expect(response.status).toBe(500);
    });
  });
});