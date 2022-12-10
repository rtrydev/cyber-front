import { Component, OnInit } from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";
import {IReportingData} from "../../../interfaces/IReportingData";

@Component({
  selector: 'app-reporting-view',
  templateUrl: './reporting-view.component.html',
  styleUrls: ['./reporting-view.component.scss']
})
export class ReportingViewComponent implements OnInit {

  reports: IReportingData[] = [];

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.reportingService.getReportingData().subscribe(res => {
      this.reports = res as IReportingData[];
    })
  }

  getDate(timestamp: number) {
    return (new Date(timestamp)).toISOString();
  }

}
