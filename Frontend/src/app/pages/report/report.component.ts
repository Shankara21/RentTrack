import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService, private exportAsService:ExportAsService) { }

  datas: any;
  data: any;
  config = paginationConfig;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'exportTable',
  }
  user: any;
  ngOnInit() {
    this.spinner.show();
    this.getData();
  }


  getData() {
    forkJoin([
      this.MasterService.GetProfile(),
      this.MasterService.GetOrders()
    ]).subscribe(([profile, orders]: any) => {
      this.user = profile.data;
      this.datas = orders.data;
      this.datas.forEach((element: any) => {
        element.index = this.datas.indexOf(element) + 1;
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  export() {
    this.exportAsService.save(this.exportAsConfig, 'Report order').subscribe(() => {
      this.AlertService.onAlert("Export Success", 'success');
    });
  }

}
