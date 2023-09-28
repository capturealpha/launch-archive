import server from "./server";
import DeploymentRouter from "./routers/deployment-router";
import { ListDeployments } from "./domain/use-cases/deployment/list";
import { ListByOwner } from "./domain/use-cases/deployment/list-by-owner";
import { DeploymentRepositoryImpl } from "./domain/repositories/deployment-repository";
import { AkashApiDeploymentDataSource } from "./data/data-sources/akash/akash-deployment-data-source";

(async () => {
  const dataSource = new AkashApiDeploymentDataSource(
    process.env.RPC_ENDPOINT,
    process.env.MNEMONIC
  );
  const repo = new DeploymentRepositoryImpl(dataSource);

  const deploymentMiddleWare = DeploymentRouter(
    new ListDeployments(repo),
    new ListByOwner(repo)
  );

  server.use("/deployment", deploymentMiddleWare);
  server.listen(process.env.PORT || 4000, () =>
    console.log(`Running on http://localhost:${process.env.PORT || 4000}`)
  );
})();
