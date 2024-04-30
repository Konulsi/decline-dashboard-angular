import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../components/filter-modal/filter-modal.component';
import {
  DECLINE_COLUMNS,
  DECLINE_LIST_DATA,
  FILTERS,
} from 'src/app/helpers/constants';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { IColumnList, IDeclineList } from 'src/app/interfaces/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decline-list',
  templateUrl: './decline-list.component.html',
  styleUrls: ['./decline-list.component.scss'],
})
export class DeclineListComponent implements OnInit {
  datepicker = new Date();
  selectedTime: string = '5';
  selectedDate = new Date();

  p: number = 0;
  collection: string[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;

  columns: any[] = DECLINE_COLUMNS;

  tableData: IDeclineList[] = [];

  filterData: any[] = FILTERS;

  selectedCol = { label: 'Merchant Name', value: '0' };
  selectedCount = { label: 'All', value: '10' };

  dataFromModal: string = '';
  subscription: Subscription | null = null;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getTableData();
    // this.itemsPerPage = 10;
  }

  onPageChange(pageNumber: number): void {
    // this.p = pageNumber;
    // this.getTableData();

    // console.log('Page number:', pageNumber);
    // // this.itemsPerPage = 10;
    // // this.showAllItems();
    this.p = pageNumber;
    console.log('Page number:', pageNumber);
    // Sayfa numarasını güncelleyin
    this.p = pageNumber;
    // API isteğini gönderin
    console.log('Sending request with page:', this.p);
    this.getTableData();
  }

  // http://retail-decline-info.unibank.lan/api/decline/decline-count?page=0&size=10&date=2024-03-05&last=5&type=0
  getTableData(
    type: string = '0',
    last: string = this.selectedTime,
    date: Date = this.selectedDate,
    count = '',
    pageNumber: number = this.p,
    pageSize: number = this.itemsPerPage,
  ) {
    console.log(
      'getTableData called with parameters:',
      type,
      last,
      date,
      count,
      pageNumber,
      pageSize,
    );
    const azeDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    let url =
      environment.apiUrl +
      'decline-count?type=' +
      type +
      '&last=' +
      last +
      '&date=' +
      azeDate +
      '&page=' +
      (pageNumber - 1) +
      '&size=' +
      pageSize;
    if (count) {
      url += '&count=' + count;
    }

    this.http.get<any>(url).subscribe((data) => {
      console.log('Response:', data);

      this.tableData = data.content;
      this.totalItems = data.totalElements;
      //  this.p = pageNumber;
    });
  }

  selectChangeValue(value: string) {
    this.getTableData(
      this.selectedCol.value,
      this.selectedTime,
      this.selectedDate,
    );
  }

  onDateChange(selectedDate: Date) {
    this.getTableData(
      this.selectedCol.value,
      this.selectedTime,
      this.selectedDate,
    );
  }

  // updateTableData(itemsPerPage: number) {
  //   this.itemsPerPage = itemsPerPage;
  //   // Sayfa numarasını sıfırlayarak her seferinde ilk sayfadan başlamasını sağlayın
  //   this.p = 0;
  //   this.getTableData();
  // }

  updateTableData(itemsPerPage: number): void {
    // itemsPerPage değişkenini güncelliyoruz
    this.itemsPerPage = itemsPerPage;

    // Yeni verileri getirmek için API isteği gönderiyoruz
    // this.getTableData();
    this.getTableData(
      undefined,
      undefined,
      undefined,
      undefined,
      1,
      this.itemsPerPage,
    );
  }
  showAllItems() {
    this.itemsPerPage = this.totalItems; // Tüm verileri getirmek için öğe sayısını toplam veri sayısına eşitliyoruz
    this.p = 0; // Sayfa numarasını sıfırlıyoruz
    // this.updateTableData(); // Tablo verilerini güncelliyoruz
    this.getTableData(); // Tüm verileri getirmek için HTTP isteği yapılıyor
    console.log('Showing all items.');
  }

  openModal(type: string): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '339px',
      height: '230px',
      data: { type },
    });

    dialogRef.componentInstance.dataToSend.subscribe((data) => {
      console.log(data);

      this.dataFromModal = data;

      this.selectedCol = {
        label: data.label,
        value: data.value,
      };

      this.getTableData(
        data.value,
        this.selectedTime,
        this.selectedDate,
        data.pan,
      );
    });

    dialogRef.afterClosed().subscribe((selectedValue) => {
      // console.log(selectedValue);

      if (selectedValue) {
        this.selectedCol = {
          label: selectedValue.label,
          value: selectedValue.value,
        };

        // this.getTableData(selectedValue.value, this.selectedTime, this.selectedDate, selectedValue.selectedPan);
        // this.getTableData(selectedValue.value);
      }
    });
  }

  redirectToDetails(typeName: string) {
    this.router.navigate(['/decline/' + typeName]);
    console.log('clicked');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
