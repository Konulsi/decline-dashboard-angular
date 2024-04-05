import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FILTERS } from 'src/app/helpers/constants';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule],
})
export class FilterModalComponent implements OnInit {
  filterModalData: any[] = FILTERS;
  selectedData = '0';

  selectedRadioValue: any; //secilmis datani saxlamaq ucun
  dataToSend: Subject<string> = new Subject<string>();

  buttons: any[] = [
    {
      text: 'All',
    },
    {
      text: '1',
    },
    {
      text: '3+',
    },
    {
      text: '5+',
    },
  ];

  selectedIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FilterModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { type: string }
  ) {}

  ngOnInit(): void {
    this.selectedData = this.data.type;
  }

  onRadioChange(value: string) {
    this.selectedRadioValue = value;
  }

  closeModal() {
    this.dialogRef.close(this.selectedRadioValue);
    this.dataToSend.next(this.selectedRadioValue || '');
  }
}
