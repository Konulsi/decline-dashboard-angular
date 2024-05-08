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
  selectedPan = '10';
  selectedIndex: number = 0;

  selectedRadioValue: any = {
    checked: false,
    display: false,
    label: 'Merchant name',
    value: '0',
  }; //secilmis datani saxlamaq ucun
  dataToSend: Subject<any> = new Subject<any>();

  buttons: any[] = [
    {
      label: 'All',
      value: '10',
    },

    {
      label: '3+',
      value: '3',
    },
    {
      label: '5+',
      value: '5',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<FilterModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { type: string },
  ) {}

  ngOnInit(): void {
    this.selectedData = this.data.type;
  }

  onRadioChange(selected: any) {
    console.log(selected);

    this.selectedRadioValue = selected;
  }

  closeModal() {
    this.selectedPan =
      this.selectedRadioValue.value === '1' ? this.selectedPan : '10';
    const selectedLabel =
      this.selectedRadioValue.value === '1'
        ? 'PAN'
        : this.selectedRadioValue.label;

    this.dataToSend.next({
      value: this.selectedRadioValue.value,
      label: selectedLabel,
      pan: this.selectedPan,
    });
    this.dialogRef.close({
      value: this.selectedRadioValue.value,
      label: selectedLabel,
      pan: this.selectedPan,
    });
  }
}
