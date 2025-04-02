
import { UserEntity } from "@/app/domain/entities/UserEntity";

export type DtoResponseUser = (UserEntity & { role : any, current_employee:any })
