import express from "express";
import asyncHandler from "express-async-handler";
import { type IListUseCase } from "@src/domain/interfaces/use-cases/deployment/list";
import { type IListByOwnerUseCase } from "@src/domain/interfaces/use-cases/deployment/list-by-owner";
import { type ICreateUseCase } from "@src/domain/interfaces/use-cases/deployment/create";

export const apiRouter = express.Router();

export default function DeploymentRouter(
  listUseCase: IListUseCase,
  listByOwnerUseCase: IListByOwnerUseCase,
  createUseCase: ICreateUseCase
): express.Router {
  const router = express.Router();

  /* router.get(
    "/:address/:dseq",
    asyncHandler(async (req, res) => {
      const deployments = await listUseCase.execute();
      res.send(deployments);
    })
  ); */

  router.get(
    "/list",
    asyncHandler(async (req, res) => {
      const deployments = await listUseCase.execute();
      res.send(deployments);
    })
  );

  router.get(
    "/listByOwner/:address",
    asyncHandler(async (req, res) => {
      const deployments = await listByOwnerUseCase.execute(req.params?.address);
      res.send(deployments);
    })
  );

  router.post("/", async (req, res) => {
    try {
      const deployment = await createUseCase.execute(req.body);
      res.statusCode = 201;
      res.send(deployment);
    } catch (err) {
      res.status(500).send({ message: "Error saving deployment", error: err });
    }
  });

  return router;
}
