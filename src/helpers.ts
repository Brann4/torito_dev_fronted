import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms"
import { NgFuncError, TypeErrorMessages, ValidatorNames } from "./types/HelpersType"
// import jsPDF from "jspdf"
// import autoTable from 'jspdf-autotable'
// import mapboxgl from "mapbox-gl"



export function getErrorByKey(controlName: string,control : AbstractControl |null): string {
  const errorMessages: TypeErrorMessages = {
    maxLength: (params) => `El campo no debe tener más de ${params.requiredLength} caracteres`,
    minLength : (params) => `El campo debe tener al menos ${params.requiredLength} caracteres`,
    min : (params) => `Valor minimo ${params.min}` ,
    required: 'Este campo es requerido',
    email: 'Ingrese un correo electrónico válido',
  }
  // const control = this.frmCrearBien.get(controlName as string)
  if (control && control.touched && control.errors) {
    let keyReasonError = Object.keys(control.errors)[0]
    let keyReasonErrorOriginal = Object.keys(control.errors)[0]
    if(keyReasonError === 'minlength'){
      keyReasonError = 'minLength'
    }
    if(keyReasonError === 'maxlength'){
      keyReasonError = 'maxLength'
    }
    const errorMessage : NgFuncError = errorMessages[keyReasonError as ValidatorNames] as NgFuncError
    return typeof errorMessage === 'function' ? errorMessage(control.errors[keyReasonErrorOriginal]) : errorMessage
  }
  return ''
}

export function getErrosOnControls(form : FormGroup){
  return Object.keys(form.controls)
    .map( (field ) =>
        ({
          field,
          errors : form.get(field)?.errors,
          status : form.get(field)?.status,
          value : form.get(field)?.value
        })
    )
}


