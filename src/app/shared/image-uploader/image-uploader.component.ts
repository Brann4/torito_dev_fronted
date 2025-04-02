import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [FileUploadModule, CommonModule,ButtonModule,ProgressBarModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  @Input() files: any[] = []; // Lista principal de archivos (carga inicial)
  @Input() maxFileSize: number = 1024000;
  @Input() accept: string = 'image/*';
  @Input() chooseLabel: string = 'Cargar imágenes';
  @Input() errorMessage: string = '';
  @Input() multiple: boolean = false;

  @Output() filesChange = new EventEmitter<any[]>();

  onSelectedFiles(event: any) {
    let newFiles = event.currentFiles;
  
    if (!this.multiple) {
      // Si multiple es false, solo toma la última imagen seleccionada
      this.files = newFiles.slice(-1);
    } else {
      // Filtra los archivos seleccionados para evitar duplicados
      newFiles = newFiles.filter(
        (newFile: any) => !this.files.some((existingFile: any) => existingFile.name === newFile.name)
      );
  
      if (newFiles.length > 0) {
        this.files = [...this.files, ...newFiles]; // Agrega nuevos archivos si multiple es true
      }
    }
  
    // Emitir los archivos actualizados
    this.filesChange.emit(this.files);
  }
  
  onRemoveFile(index: number) {
    console.log('Eliminando archivo', index);
    // Remueve el archivo según su índice
    this.files = this.files.filter((_, i) => i !== index);
    this.filesChange.emit(this.files); // Emitir los archivos actualizados
  }

  trackByFile(index: number, file: any): string {
    return file.global_url || file.name;
  }
}
