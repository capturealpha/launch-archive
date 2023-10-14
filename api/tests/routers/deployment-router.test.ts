import request from "supertest";
import { type Deployment } from "../../src/domain/entities/deployment";
import { type IListUseCase } from "../../src/domain/interfaces/use-cases/deployment/list";
import { type IListByOwnerUseCase } from "../../src/domain/interfaces/use-cases/deployment/list-by-owner";
import { type ICreateUseCase } from "../../src/domain/interfaces/use-cases/deployment/create";
import DeploymentRouter from "../../src/routers/deployment-router";
import server from "../../src/server";
import Long from "long";
import { base64FromBytes } from "../../../shared/utils/encode";

const testAddress1 = "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q4";
const testAddress2 = "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q5";
const testAddress3 = "akash1xq5s8qmhvsvxvz8v5s3s6z4j0n3x5q9q4qz4q6";
const testData: Deployment[] = [
  {
    owner: testAddress1,
    dseq: Long.ZERO.toNumber(),
    state: 0,
    createdAt: Long.ZERO.toNumber(),
    version: base64FromBytes(new Uint8Array())
  },
  {
    owner: testAddress2,
    dseq: Long.ZERO.toNumber(),
    state: 0,
    createdAt: Long.ZERO.toNumber(),
    version: base64FromBytes(new Uint8Array())
  }
];

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

class MockCreateUseCase implements ICreateUseCase {
  async execute(deployment: Deployment): Promise<Deployment> {
    throw new Error(`Method not implemented. ${deployment}`);
  }
}

describe("Deployment Router", () => {
  let mockListUseCase: IListUseCase;
  let mockListByOwnerUseCase: IListByOwnerUseCase;
  let mockCreateUseCase: ICreateUseCase;

  beforeAll(() => {
    mockListUseCase = new MockListUseCase();
    mockListByOwnerUseCase = new MockListByOwnerUseCase();
    mockCreateUseCase = new MockCreateUseCase();
    server.use(
      "/deployment",
      DeploymentRouter(
        mockListUseCase,
        mockListByOwnerUseCase,
        mockCreateUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /deployment", () => {
    // List all deployments
    test("should return 200 with data", async () => {
      jest
        .spyOn(mockListUseCase, "execute")
        .mockImplementation(async () => await Promise.resolve(testData));

      const response = await request(server).get(`/deployment/list`);

      expect(response.status).toBe(200);
      expect(mockListUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(testData);
    });

    test("GET /deployment returns 500 on use case error", async () => {
      jest
        .spyOn(mockListUseCase, "execute")
        .mockImplementation(
          async () => await Promise.reject(Error("Error fetching deployments"))
        );
      const response = await request(server).get(`/deployment/list`);
      expect(response.status).toBe(500);
    });

    // List deployments by owner
    test("should return 200 with data", async () => {
      jest
        .spyOn(mockListByOwnerUseCase, "execute")
        .mockImplementation(
          async () =>
            await Promise.resolve(
              testData.filter((d) => d.owner === testAddress1)
            )
        );

      const response = await request(server).get(
        `/deployment/listByOwner/${testAddress1}`
      );

      expect(response.status).toBe(200);
      expect(mockListByOwnerUseCase.execute).toBeCalledTimes(1);
      expect(response.body[0].owner).toStrictEqual(testAddress1);
    });

    test(`GET /deployment/${testAddress1} returns 500 on use case error`, async () => {
      jest
        .spyOn(mockListByOwnerUseCase, "execute")
        .mockImplementation(
          async () => await Promise.reject(Error("Error fetching deployments"))
        );
      const response = await request(server).get(
        `/deployment/listByOwner/${testAddress1}`
      );
      expect(response.status).toBe(500);
    });
  });

  describe("POST /deployment", () => {
    const newDeployment = {
      owner: testAddress3,
      dseq: Long.ZERO.toNumber(),
      state: 0,
      createdAt: Long.ZERO.toNumber(),
      version: base64FromBytes(new Uint8Array())
    };

    // Create deployment
    test("should return 200 with data", async () => {
      jest
        .spyOn(mockCreateUseCase, "execute")
        .mockImplementation(async () => await Promise.resolve(newDeployment));

      const response = await request(server)
        .post(`/deployment`)
        .send(newDeployment);

      expect(response.status).toBe(201);
      expect(mockCreateUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(newDeployment);
    });

    test(`POST /deployment returns 500 on use case error`, async () => {
      jest
        .spyOn(mockCreateUseCase, "execute")
        .mockImplementation(
          async () => await Promise.reject(Error("Error creating deployment"))
        );
      const response = await request(server)
        .post(`/deployment`)
        .send(newDeployment);
      expect(response.status).toBe(500);
    });
  });
});
