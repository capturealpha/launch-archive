import { DeploymentOwner } from './deployment-owner';

export interface DeploymentGroup {    
  groupId: DeploymentOwner; 
  state: string;
  createdAt: string;
}