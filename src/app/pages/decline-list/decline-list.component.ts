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

  // tableData: any[] = DECLINE_LIST_DATA;

  // columns: IColumnList[] = [];

  tableData: IDeclineList[] = [];

  filterData: any[] = FILTERS;

  selectedCol = { label: 'Merchant Name', value: '0' };
  selectedCount = { label: 'All', value: '10' };

  dataFromModal: string = '';
  subscription: Subscription | null = null;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private apiService: ApiService,
    private datePipe: DatePipe,
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
  ) {
    console.log(date);
    const azDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    let url =
      environment.apiUrl +
      'decline-count?type=' +
      type +
      '&last=' +
      last +
      '&date=' +
      azDate;
    if (count) {
      url += '&count=' + count;
    }
    this.http.get<any>(url).subscribe((data) => {
      console.log(data);

      this.tableData = data.content;
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

  openModal(type: string): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
      width: '339px',
      height: '230px',
      data: { type },
    });

    dialogRef.componentInstance.dataToSend.subscribe((data) => {
      console.log(data);

      this.dataFromModal = data;
      // if(data.value === '1'){
      // this.getTableData(data.value, this.selectedTime, this.selectedDate, data.pan);

      // }else{
      // this.getTableData(data.value, this.selectedTime, this.selectedDate);

      // }

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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
