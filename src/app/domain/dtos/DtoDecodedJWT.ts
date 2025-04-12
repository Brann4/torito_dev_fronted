import { UserEntity } from "../entities/UserEntity";

export interface DtoDecodedJWT {
  // Claims específicos según tu ejemplo de JWT
  success: boolean; // success convertido de string a boolean
  message: string; // message convertido de string a boolean
  data: UserEntity;
}
