import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as XLSX from 'xlsx';
import { IDeclineList } from '../interfaces/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  baseUrl = environment.apiUrl;
  tableData: IDeclineList[] = [];

  constructor(private http: HttpClient) {}

  exportToExcel() {
    const params = {
      type: '0',
      last: '5',
      date: new Date().toISOString(),
      page: '0',
      size: '10',
    };
    // if (count) {
    //   params += '&count=' + count;
    // }

    this.http
      .get<IDeclineList[]>(this.baseUrl + 'decline-count', { params })
      .subscribe(
        (data) => {
          console.log('Response:', data);
          this.createExcelFile(data);
        },
        (error) => {
          console.error('Error:', error);
        },
      );
  }

  // createExcelFile(data: IDeclineList[] | IDeclineList) {
  //   let dataArray: any[];

  //   if (Array.isArray(data)) {
  //     dataArray = data.map((item) => [
  //       item.key,
  //       item.type,
  //       item.count,
  //       item.number,
  //     ]);
  //   } else if (data) {
  //     dataArray = [[data.key, data.type, data.count, data.number]];
  //   } else {
  //     console.error('No data received from API.');
  //     return;
  //   }

  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, 'data.xlsx');
  //   console.log('Clicked on Excel button');
  // }

  createExcelFile(data: any) {
    // API yanıtını uygun bir dizi formatına dönüştür
    const jsonData = data.content.map((item: any) => {
      return {
        property1: item.key,
        property2: item.type,
        property3: item.number,
        property4: item.count,
      };
    });

    // JSON verisini Excel sayfasına dönüştür
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, 'data.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
