// src/app/validators/date-range.validator.ts

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.root.get('start_date')?.value;
  const endDate = control.value;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return { dateRangeInvalid: 'La fecha final no puede ser igual o anterior a la fecha inicial' };
    }
  }
  return null;
}
