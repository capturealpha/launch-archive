import { type DeploymentDataSource } from "../../interfaces/data-sources/deployment-data-source";
import { type AkashApiWrapper } from "../../interfaces/data-sources/akash-api-wrapper";
import { type DeploymentResponseModel } from "../../models/deployment";

export class AkashApiDeploymentDataSource implements DeploymentDataSource {
  private readonly datasource: AkashApiWrapper;
  constructor(datasource: AkashApiWrapper) {
    this.datasource = datasource;
  }

  async getAll(): Promise<DeploymentResponseModel[]> {
    const result = await this.datasource.find({});
    return result.map((item) => ({
      state: item.state
    }));
  }
}
