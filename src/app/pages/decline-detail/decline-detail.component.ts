import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnListComponent } from '../components/column-list/column-list.component';
import { COLUMNS } from 'src/app/helpers/constants';
import { IDeclineDetails } from 'src/app/interfaces/types';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-decline-detail',
  templateUrl: './decline-detail.component.html',
  styleUrls: ['./decline-detail.component.scss'],
})
export class DeclineDetailComponent implements OnInit, OnDestroy {
  datepicker = new Date();
  selectedTime = '5';
  selectedDate = new Date();

  p: number = 1;
  collection: string[] = [];
  totalItems = 0;
  itemsPerPage: number = 10;

  displayedColumns: any[] = [];
  tableData: IDeclineDetails[] = [];

  currentPageSubscription: Subscription;

  filters: any = {
    typeName: '',
  };

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private sharedService: SharedService,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const type = params['type'] || '0';
      const last = params['last'] || this.selectedTime;
      const date = params['date']
        ? new Date(params['date'])
        : this.selectedDate;
      const pageNumber = params['pageNumber'] ? +params['pageNumber'] : 1;
      const pageSize = params['pageSize']
        ? +params['pageSize']
        : this.itemsPerPage;
      const count = params['count'] || '';
      this.filters.typeName = params['typeName'];

      this.selectedTime = last;
      this.selectedDate = date;
      this.p = pageNumber;
      this.itemsPerPage = pageSize;

      this.sharedService.setCurrentPage('DETAIL', this.filters.typeName);
      this.getDisplayedColumns(COLUMNS);
      this.getTableDataByName(
        type,
        last,
        date,
        count,
        this.filters.typeName,
        pageNumber,
        pageSize,
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
    typeName: string = this.filters.typeName,
    pageNumber: number = this.p,
    pageSize: number = this.itemsPerPage,
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
      typeName +
      '&page=' +
      (pageNumber - 1) +
      '&size=' +
      pageSize;
    if (count) {
      url += '&count=' + count;
    }

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.tableData = data.content;
        this.totalItems = data.totalElements;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;

    this.activatedRoute.params.subscribe((params) => {
      const type = params['type'] || '0';
      const last = params['last'] || this.selectedTime;
      const date = params['date']
        ? new Date(params['date'])
        : this.selectedDate;
      const count = params['count'] || '';
      this.filters.typeName = params['typeName'];

      this.getTableDataByName(
        type,
        last,
        date,
        count,
        this.filters.typeName,
        pageNumber,
        this.itemsPerPage,
      );

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          type,
          last,
          date,
          count,
          pageNumber,
          typeName: this.filters.typeName,
        },
        queryParamsHandling: 'merge',
      });
    });

    // this.getTableDataByName();
  }

  updateTableData(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.getTableDataByName(
      undefined,
      undefined,
      undefined,
      undefined,
      this.filters.typeName,
      1,
      this.itemsPerPage,
    );
  }
  showAllItems() {
    this.itemsPerPage = this.totalItems;
    this.p = 0;
    this.getTableDataByName();
    console.log('Showing all items.');
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

  ngOnDestroy(): void {
    if (this.currentPageSubscription) {
      this.currentPageSubscription.unsubscribe();
    }
  }
}
