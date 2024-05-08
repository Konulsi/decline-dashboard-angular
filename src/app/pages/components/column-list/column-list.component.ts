import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNS } from 'src/app/helpers/constants';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule],
})
export class ColumnListComponent implements OnInit {
  columns: any[] = COLUMNS;
  modalColumns: any[] = this.columns.filter((column) => !column.display);
  selectedColumns: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ColumnListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  addSelectedColumn() {
    this.selectedColumns = this.modalColumns.filter((column) => column.checked);
    this.dialogRef.close({
      selectedColumns: this.selectedColumns,
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
