import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../components/filter-modal/filter-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { DatePipe } from '@angular/common';
import { IDeclineList } from 'src/app/interfaces/types';
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

  tableData: IDeclineList[] = [];
  selectedCol = { label: 'Merchant Name', value: '0' };
  selectedCount = { label: 'All', value: '10' };

  dataFromModal: string = '';

  // Verileri HeaderComponent içine aktarmak için output tanımlayın
  @Output() tableDataEvent: EventEmitter<IDeclineList[]> = new EventEmitter<
    IDeclineList[]
  >();

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
      this.tableDataEvent.emit(data);
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

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    this.getTableData();
  }

  updateTableData(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
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
    this.itemsPerPage = this.totalItems;
    this.p = 0;
    this.getTableData();
    console.log('Showing all items.');
  }

  openModal(type: string): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '339px',
      height: '230px',
      data: { type },
    });

    dialogRef.componentInstance.dataToSend.subscribe((data) => {
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
      if (selectedValue) {
        this.selectedCol = {
          label: selectedValue.label,
          value: selectedValue.value,
        };
      }
    });
  }

  redirectToDetails(typeName: string) {
    this.router.navigate(['/decline/' + typeName]);
    console.log('clicked');
  }
}
