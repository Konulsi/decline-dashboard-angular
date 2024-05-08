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
    this.http
      .get<any>(this.baseUrl + 'export-to-excel/main-page')
      .subscribe((data) => {
        this.createExcelFile(data);
        console.log('export excel file', data);
      });
  }

  createExcelFile(data: any[]) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
    console.log('clicked Excell button');
  }
}
