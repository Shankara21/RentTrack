import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService) { }

  datas: any;
  data: any;
  config = paginationConfig;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.spinner.show();
    this.getData();
  }


  getData() {
    this.MasterService.GetLocations().subscribe((response: any) => {
      this.datas = response.data;
      this.datas.forEach((element: any) => {
        element.index = this.datas.indexOf(element) + 1;
      })
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  showData(id: number) {
    this.spinner.show();
    this.MasterService.ShowLocation(id).subscribe((response: any) => {
      this.data = response.data;
      this.form.patchValue({
        name: this.data.name,
        region: this.data.region,
        type: this.data.type,
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }


  createData() {
    if (this.form.invalid) {
      this.AlertService.onAlert('Form invalid!', 'warning');
      return;
    }
    this.MasterService.AddLocation(this.form.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.form.reset();
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }


  updateData(id: number) {
    if (this.form.invalid) {
      this.AlertService.onAlert('Form invalid!', 'warning');
      return;
    }
    this.MasterService.UpdateLocation(id, this.form.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.form.reset();
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }


  deleteData(id: number) {
    this.MasterService.DeleteLocation(id).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }
}
