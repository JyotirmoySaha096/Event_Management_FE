import { Role } from "./role.model";

export interface User {
  userId: number;
  name: string;
  email: string;
  roleId: number;
  events: [];
  organizers: [];
  participants: [];
  role: Role;
}

export interface UserCred{
    name: string;
    email: string;
    password:string
}
