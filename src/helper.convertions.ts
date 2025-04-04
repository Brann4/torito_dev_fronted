import { encode } from "punycode";
import { Observable } from "rxjs";

export function createFormData(values: any): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      if (value.length > 0 && value[0] instanceof File) {
        // Si la propiedad es un array de archivos
        value.forEach((file: File, index: number) => {
          formData.append(`${key}[${index}]`, file, file.name);
        });
      } else {
        // Si es un array de valores simples
        value.forEach((item) => {
          formData.append(`${key}[]`, String(item)); // Convertir a string explícitamente
        });
      }
    } else if (value instanceof File) {
      // Si el valor es un archivo individual
      formData.append(key, value, value.name);
    } else if (typeof value === 'object' && value !== null) {
      // Si es un objeto, se convierte a JSON string
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === 'boolean') {
      // Si el valor es booleano, se envía como 'true' o 'false'
      formData.append(key, value ? '1' : '0');
    } else if (typeof value === 'number') {
      // Si el valor es numérico, se convierte explícitamente a string
      formData.append(key, value.toString());
    } else if (typeof value !== 'undefined' && value !== null) {
      // Si es un string válido, se añade directamente
      formData.append(key, value as string);
    }
  }

  return formData;
}

  
export async function createFileEmptyFromUrl(fullURL : string) {
  const file = new File([new Blob()], fullURL, { type: "image/*" });
  return file;
}
/*
export function  getBase64EncodedFileData(file:File) : Observable<string>{
  return new Observable( observer => {
    const reader = new FileReader();

    reader.onload = () => {
      const {result} = reader;
      const data = result as ArrayBuffer;
      const base64Encoded = encode(data);

      observer.next(base64Encoded);
      observer.complete();

    }
  });
}*/