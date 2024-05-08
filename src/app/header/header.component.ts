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

  itemsPerPage: number = 20; //isteye gore deyisilmelidir

  constructor(private http: HttpClient) {}

  exportToExcel() {
    const params = {
      type: '0',
      last: '5',
      date: new Date().toISOString(),
      page: '0',
      size: this.itemsPerPage,
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

  createExcelFile(data: any) {
    const jsonData = data.content.map((item: any) => {
      return {
        ID: item.key,
        Name: item.type,
        Number: item.number,
        Count: item.count,
      };
    });

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
