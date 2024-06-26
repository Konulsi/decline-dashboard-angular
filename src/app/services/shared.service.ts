import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentPageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    '',
  );
  public currentPage$: Observable<any> = this.currentPageSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentPage(pageType: string, typeName: string = '') {
    this.currentPageSubject.next({ pageType, typeName });
  }

  exportToExcel(
    url: string,
    params: HttpParams,
    pageType: string,
  ): Observable<Blob> {
    console.log('Requesting Excel export:', url, params.toString());
    return this.http.get(url, { params, responseType: 'blob' });
  }

  createExcelFile(data: Blob) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const dataArray = new Uint8Array(e.target.result);
      const wb = XLSX.read(dataArray, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      this.currentPage$.subscribe((pageInfo) => {
        this.processJsonData(jsonData, pageInfo.pageType);
      });
    };
    reader.readAsArrayBuffer(data);
  }
  processJsonData(jsonData: any, pageType: string) {
    if (jsonData.length === 0) {
      return;
    }

    let formattedData;

    if (pageType === 'DETAIL') {
      formattedData = jsonData.map((item: any) => {
        return {
          'FULL Name': item['Full Name'],
          Telephone: item['Telephone'],
          'Merchant Name': item['Merchant Name'],
          'Decline Reason': item['Decline Reason'],
          Result: item['Result'],
          TransactionId: item['TransactionId'],
          Amount: item['Amount'],
          'Expired Date': item['Expired Date'],
          '3D': item['3D'],
          'Fin Code': item['Fin Code'],
          'Operation Time': item['Operation Time'],
          Currency: item['Currency'],
          Extrid: item['ExtRid'],
          Dpan: item['Dpan'],
          ProdType: item['ProdType'],
          WalletType: item['DpanWalletRid'],
          'Acquirer Country Id': item['Acquirer Country Id'],
          'Card Status': item['Card Status'],
          'Azn Equivalent': item['Azn Equivalent'],
          'Credit Limit': item['Credit Limit'],
          'Entry Mode': item['Entry Mode'],
        };
      });
    } else {
      formattedData = jsonData.map((item: any) => {
        return {
          'Top Number': item['Top Number'],
          'Merchant Name': item['Merchant Name'],
          Count: item['Count'],
        };
      });
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const columnWidths: number[] = [];
    formattedData.forEach((row: any) => {
      Object.keys(row).forEach((key) => {
        const columnIndex = XLSX.utils.decode_col(key);
        const cellLength = String(row[key]).length;
        if (
          !columnWidths[columnIndex] ||
          cellLength > columnWidths[columnIndex]
        ) {
          columnWidths[columnIndex] = cellLength;
        }
      });
    });

    // Her sütun için maksimum uzunluğu genişlik olarak ayarla
    ws['!cols'] = columnWidths.map((width) => ({ wch: width }));

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
