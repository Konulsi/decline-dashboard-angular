import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as XLSX from 'xlsx';
import { IDeclineList } from '../interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  baseUrl = environment.apiUrl;
  tableData: IDeclineList[] = [];

  itemsPerPage: number = 20; //isteye gore deyisilmelidir
  selectedTime = '5';
  selectedDate = new Date();

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {}

  exportToExcel() {
    const azDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');

    let params = new HttpParams()
      .set('type', '0')
      .set('last', this.selectedTime)
      .set('date', azDate)
      .set('page', '0')
      .set('size', this.itemsPerPage.toString());

    this.http
      .get(this.baseUrl + 'export-to-excel/main-page', {
        params,
        responseType: 'blob',
      })
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

  createExcelFile(data: Blob) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const dataArray = new Uint8Array(e.target.result);
      const wb = XLSX.read(dataArray, { type: 'array' });

      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      console.log('JSON Data:', jsonData);
      this.processJsonData(jsonData);
    };
    reader.readAsArrayBuffer(data);
  }

  processJsonData(jsonData: any) {
    if (jsonData.length === 0) {
      console.warn('Boş veri seti döndü');
      return;
    }

    const formattedData = jsonData.map((item: any) => {
      return {
        'Top Number': item['Top Number'],
        'Merchant Name': item['Merchant Name'],
        Count: item['Count'],
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
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
