import { Deployment } from "../../entities/deployment"; 

export interface DeploymentRepository { 
    getDeployment(): Promise<Deployment[]>; 
}