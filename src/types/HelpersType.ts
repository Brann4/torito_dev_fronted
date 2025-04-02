import { Validators } from "@angular/forms";

export type ValidatorNames = keyof typeof Validators
export type TypeErrorMessages = {
  [key in  ValidatorNames]? : NgFuncError
}

export type NgFuncError = string | ( (params : any) => string )
