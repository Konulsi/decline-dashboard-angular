import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as XLSX from 'xlsx';
import { IDeclineList } from '../interfaces/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from '../services/shared.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  baseUrl = environment.apiUrl;
  tableData: IDeclineList[] = [];

  itemsPerPage: number = 20; //isteye gore deyisilmelidir
  selectedTime = '5';
  selectedDate = new Date();

  currentPage: string = '';
  currentPageSubscription: Subscription;
  isDetail = false;
  typeName = '';

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.currentPageSubscription = this.sharedService.currentPage$.subscribe(
      (obj) => {
        this.isDetail = obj.pageType === 'DETAIL';
        this.typeName = obj.typeName;
        console.log(this.isDetail);
      },
    );
  }

  exportToExcel() {
    const currentPage = this.router.url;
    let url = '';

    if (this.isDetail) {
      url = `${this.baseUrl}export-to-excel?typeName=${this.typeName}`;
    } else {
      url = `${this.baseUrl}export-to-excel/main-page`;
    }

    const params = new HttpParams()
      .set('type', '0')
      .set('last', '5')
      .set('date', this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '')
      .set('page', '0')
      .set('size', '20');

    this.sharedService
      .exportToExcel(url, params, currentPage)
      .subscribe((blobData) => {
        this.sharedService.createExcelFile(blobData);
      });
  }

  ngOnDestroy(): void {
    if (this.currentPageSubscription) {
      this.currentPageSubscription.unsubscribe();
    }
  }
}
