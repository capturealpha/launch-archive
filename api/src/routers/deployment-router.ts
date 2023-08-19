import express from "express";
import asyncHandler from "express-async-handler";
//import DeploymentService from "../domain/repositories/deployment-repository";
import { GetDeploymentUseCase } from '../domain/interfaces/use-cases/deployment/get-deployment'



export const apiRouter = express.Router();

export default function DeploymentRouter(getDeploymentUseCase: GetDeploymentUseCase) {
  // const AkashQuery = await import(`@akashnetwork/akashjs/build/protobuf/akash/deployment/${process.env.API_VERSION}/query`)
  // .then((module) => module);
  //const deploymentService = new DeploymentService(process.env.API_VERSION, process.env.RPC_ENDPOINT, AkashQuery);
  const router = express.Router();

  // router.get(
  //   "/byAddress/:address",
  //   asyncHandler(async (req, res) => {
  //     const address = req.params.address;
  //     const deployments = await getDeploymentUseCase.execute(address);
  //     //const deployments = await deploymentService.listByOwner(address);
  //     res.send(deployments);
  //   })
  // );

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const address = req.params.address;
      const deployments = await getDeploymentUseCase.execute(address || "");
      //const deployments = await deploymentService.listByOwner(address);
      res.send(deployments);
    })
  );

  return router;
}

