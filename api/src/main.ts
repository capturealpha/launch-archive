import server from "./server";
import DeploymentRouter from "./routers/deployment-router";
import { GetDeployments } from "./domain/use-cases/deployment/get-deployments";
import { DeploymentRepositoryImpl } from "./domain/repositories/deployment-repository";
import { AkashApiDeploymentDataSource } from "./data/data-sources/akash-api/akash-api-deployment-data-source";

(async () => {
  const dataSource = new AkashApiDeploymentDataSource(process.env.RPC_ENDPOINT);

  const deploymentMiddleWare = DeploymentRouter(
    new GetDeployments(new DeploymentRepositoryImpl(dataSource))
  );

  server.use("/deployment", deploymentMiddleWare);
  server.listen(process.env.PORT || 4000, () =>
    console.log(`Running on http://localhost:${process.env.PORT || 4000}`)
  );
})();
