import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnListComponent } from '../components/column-list/column-list.component';
import { COLUMNS } from 'src/app/helpers/constants';
import { IDeclineDetails } from 'src/app/interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-decline-detail',
  templateUrl: './decline-detail.component.html',
  styleUrls: ['./decline-detail.component.scss'],
})
export class DeclineDetailComponent implements OnInit {
  datepicker = new Date();
  selectedTime = '5';
  selectedDate = new Date();

  p: number = 1;
  collection: string[] = [];
  totalItems = 0;

  displayedColumns: any[] = [];
  tableData: IDeclineDetails[] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getDisplayedColumns(COLUMNS);
    this.activatedRoute.params.subscribe(({ typeName }) => {
      console.log('Received merchantName:', typeName);

      this.getTableDataByName(
        '0',
        this.selectedTime,
        this.selectedDate,
        '',
        typeName,
      );
    });
  }

  getDisplayedColumns(cols: any = []) {
    this.displayedColumns = cols.filter((column: any) => column.display);
  }

  getTableDataByName(
    type: string = '0',
    last: string = this.selectedTime,
    date: Date = this.selectedDate,
    count = '',
    typeName: string = '',
  ) {
    const azDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    //retail-decline-info.unibank.lan/api/decline/by?page=0&size=10&date=2024-04-24&last=5&type=0&typeName=EMBAFINANS

    let url =
      environment.apiUrl +
      'by?type=' +
      type +
      '&last=' +
      last +
      '&date=' +
      azDate +
      '&typeName=' +
      typeName;
    if (count) {
      url += '&count=' + count;
    }

    this.http.get<any>(url).subscribe((data) => {
      this.tableData = data.content;
      this.totalItems = data.totalElements;
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ColumnListComponent, {
      position: { right: '0', top: '0' },
      minHeight: '100%',
      height: '100%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      const selecteds = result.selectedColumns;

      if (selecteds.length) {
        for (const column of selecteds) {
          if (
            !this.displayedColumns.some(
              (existingColumn: any) => existingColumn.key === column.key,
            )
          ) {
            this.displayedColumns.push({
              key: column.key,
              label: column.label,
              display: true,
            });
          }
        }

        this.getDisplayedColumns(this.displayedColumns);
      }
    });
  }
}
