import {Roles} from "../enums/roles";

export interface IUserData {
  id: string,
  role: Roles,
  token: string
}
