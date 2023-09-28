import express from "express";
import asyncHandler from "express-async-handler";
import { type IListUseCase } from "@src/domain/interfaces/use-cases/deployment/list";
import { type IListByOwnerUseCase } from "@src/domain/interfaces/use-cases/deployment/list-by-owner";

export const apiRouter = express.Router();

export default function DeploymentRouter(
  listUseCase: IListUseCase,
  listByOwnerUseCase: IListByOwnerUseCase
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

  return router;
}
