import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('fileInput') fileInput: any;

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadExcel() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('excelFile', file, file.name);
      this.http.post<any>(this.baseUrl + 'export-to-excel', formData).subscribe(
        (response) => {
          console.log('Fayl yüklendi.', response);
        },
        (error) => {
          console.error('yuklenmedi.', error);
        },
      );
    }
  }
}
