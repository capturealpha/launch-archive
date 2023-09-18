import express from "express";
import asyncHandler from "express-async-handler";
import { type GetDeploymentsUseCase } from "@src/domain/interfaces/use-cases/deployment/get-deployments";
import { type GetDeploymentsByOwnerUseCase } from "@src/domain/interfaces/use-cases/deployment/get-deployments-by-owner";

export const apiRouter = express.Router();

export default function DeploymentRouter(
  getDeploymentsUseCase: GetDeploymentsUseCase,
  getDeploymentsByOwnerUseCase: GetDeploymentsByOwnerUseCase
): express.Router {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const deployments = await getDeploymentsUseCase.execute();
      res.send(deployments);
    })
  );

  router.get(
    "/byOwner/:address",
    asyncHandler(async (req, res) => {
      const deployments = await getDeploymentsByOwnerUseCase.execute(
        req.params?.address
      );
      res.send(deployments);
    })
  );

  return router;
}
