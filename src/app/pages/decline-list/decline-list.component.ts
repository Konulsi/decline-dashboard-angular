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

@Component({
  selector: 'app-decline-list',
  templateUrl: './decline-list.component.html',
  styleUrls: ['./decline-list.component.scss'],
})
export class DeclineListComponent implements OnInit {
  datepicker = new Date();
  selectedTime: string = '5';
  selectedDate = new Date();

  p: number = 1;
  collection: string[] = [];

  columns: any[] = DECLINE_COLUMNS;

  tableData: any[] = DECLINE_LIST_DATA;

  filterData: any[] = FILTERS;

  selectedCol = { label: 'Merchant Name', value: '0' };

  dataFromModal: string = '';
  subscription: Subscription | null = null;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private apiService: ApiService,
    private datePipe: DatePipe
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
    date: Date = this.selectedDate
  ) {
    const isoDate = new Date(date);
    const hours = Number(last);
    isoDate.setHours(hours);

    const azDate = this.datePipe.transform(
      isoDate,
      'yyyy-MM-ddTHH:mm:ss',
      'Asia/Baku'
    );

    const url =
      environment.apiUrl +
      'decline-count?type=' +
      type +
      '&last=' +
      last +
      '&date=' +
      azDate;
    return this.http.get<any>(url).subscribe((data) => {
      console.log(data);
    });
  }

  selectChangeValue(value: string) {
    this.getTableData(
      this.selectedCol.value,
      this.selectedTime,
      this.selectedDate
    );
  }

  onDateChange(selectedDate: Date) {
    // const selectedDate = event.value;
    // const dateString = selectedDate.toString('dd-MM-yyyy');

    // this.apiService.getDataForDate(dateString).subscribe((data) => {
    //   this.apiService = data;
    // });

    const isoDate = selectedDate.toISOString().split('T')[0];
    this.http
      .get<any[]>(environment.apiUrl, {
        params: { date: isoDate },
      })
      .subscribe((data) => {
        this.tableData = data;
        console.log(data);
      });

    // this.getTableData(
    //   this.selectedCol.value,
    //   this.selectedTime,
    //   this.selectedDate
    // );
  }

  openModal(type: string): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '339px',
      height: '230px',
      data: { type },
    });

    dialogRef.componentInstance.dataToSend.subscribe((data) => {
      this.dataFromModal = data;
    });

    dialogRef.afterClosed().subscribe((selectedValue) => {
      if (selectedValue) {
        this.selectedCol = {
          label: selectedValue.label,
          value: selectedValue.value,
        };
        this.getTableData(selectedValue.value);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
