import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  reportingApiUrl = environment.reportingApiUrl;

  constructor(private httpClient: HttpClient) { }

  public getReportingData() {
    return this.httpClient.get(`${this.reportingApiUrl}/reporting`);
  }
}
