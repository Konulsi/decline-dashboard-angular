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

  createExcelFile(data: IDeclineList[] | IDeclineList) {
    let dataArray: any[];

    if (Array.isArray(data)) {
      dataArray = data.map((item) => [
        item.key,
        item.type,
        item.count,
        item.number,
      ]);
    } else if (data) {
      dataArray = [[data.key, data.type, data.count, data.number]];
    } else {
      console.error('No data received from API.');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
    console.log('Clicked on Excel button');
  }
}
