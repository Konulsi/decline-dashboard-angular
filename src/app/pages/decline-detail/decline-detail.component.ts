import { Column } from './../../interfaces/types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColumnListComponent } from '../components/column-list/column-list.component';
import { COLUMNS, DECLINE_DETAIL_DATA } from 'src/app/helpers/constants';

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

  displayedColumns: any[] = [];

  tableData: any[] = DECLINE_DETAIL_DATA;

  displayTableData: any[] = [];

  constructor(public dialog: MatDialog) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    // this.getFullTableData();
    this.getDisplayedColumns(COLUMNS);
  }

  // getFullTableData() {
  //   for (const data of this.tableData) {
  //     const row: any = {};
  //     for (const column of this.displayedColumns) {
  //       row[column.key] = data[column.key];
  //     }
  //     const isNotDefined = Object.keys(row).every((key) => !row[key]);
  //     if (!isNotDefined) {
  //       this.displayTableData.push(row);
  //     }
  //   }
  // }

  getDisplayedColumns(cols: any = []) {
    this.displayedColumns = cols.filter((column: any) => column.display);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { right: '0', top: '0' };
    dialogConfig.restoreFocus = false;
    dialogConfig.width = '387px';
    dialogConfig.height = '100vh';
    const dialogRef = this.dialog.open(ColumnListComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      const selecteds = result.selectedColumns;

      if (selecteds.length) {
        for (const column of selecteds) {
          if (
            !this.displayedColumns.some(
              (existingColumn: any) => existingColumn.key === column.key
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
