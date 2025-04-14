import { UserEntity } from "../entities/UserEntity";

export interface DtoDecodedJWT {
  success: boolean; 
  message: string; 
  data: UserEntity;
}
