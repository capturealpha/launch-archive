import request from "supertest";
import { type Deployment } from "../../src/domain/entities/deployment";
import { type IListUseCase } from "../../src/domain/interfaces/use-cases/deployment/list";
import { type IListByOwnerUseCase } from "../../src/domain/interfaces/use-cases/deployment/list-by-owner";
import DeploymentRouter from "../../src/routers/deployment-router";
import server from "../../src/server";
import Long from "long";
import { base64FromBytes } from "../../../shared/utils/encode";

class MockListUseCase implements IListUseCase {
  async execute(): Promise<Deployment[]> {
    throw new Error("Method not implemented.");
  }
}

class MockListByOwnerUseCase implements IListByOwnerUseCase {
  async execute(ownerAdreass: string): Promise<Deployment[]> {
    throw new Error(`Method not implemented. ${ownerAdreass}`);
  }
}

describe("Deployment Router", () => {
  let mockListUseCase: IListUseCase;
  let mockListByOwnerUseCase: IListByOwnerUseCase;

  beforeAll(() => {
    mockListUseCase = new MockListUseCase();
    mockListByOwnerUseCase = new MockListByOwnerUseCase();
    server.use(
      "/deployment",
      DeploymentRouter(mockListUseCase, mockListByOwnerUseCase)
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /deployment", () => {
    test("should return 200 with data", async () => {
      const expectedData: Deployment[] = [
        {
          owner: "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q4",
          dseq: Long.ZERO.toNumber(),
          state: 0,
          createdAt: Long.ZERO.toNumber(),
          version: base64FromBytes(new Uint8Array())
        }
      ];
      jest
        .spyOn(mockListUseCase, "execute")
        .mockImplementation(async () => await Promise.resolve(expectedData));

      const response = await request(server).get("/deployment/list");

      expect(response.status).toBe(200);
      expect(mockListUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("GET /deployment returns 500 on use case error", async () => {
      jest
        .spyOn(mockListUseCase, "execute")
        .mockImplementation(
          async () => await Promise.reject(Error("Error fetching data"))
        );
      const response = await request(server).get("/deployment/list");
      expect(response.status).toBe(500);
    });
  });
});
