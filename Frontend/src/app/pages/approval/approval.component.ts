import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService, private authService:AuthService) { }

  datas: any;
  data: any;
  config = paginationConfig;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  status_colors = [
    { name: 'Pending', color: 'bg-blue-500' },
    { name: 'Rejected', color: 'bg-red-500' },
    { name: 'Approved', color: 'bg-green-500' }
  ];
  user:any;
  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.spinner.show();
    this.getData();
  }


  getData() {
    this.MasterService.GetApprovals().subscribe((response: any) => {

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

  showData(id: any) {
    this.spinner.show();
    this.MasterService.ShowOrder(id).subscribe((response: any) => {
      this.data = response.data;
      this.form.patchValue({
        name: this.data.name,
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
    this.MasterService.AddDriver(this.form.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.form.reset();
    });
  }


  updateData(id: number) {
    if (this.form.invalid) {
      this.AlertService.onAlert('Form invalid!', 'warning');
      return;
    }
    this.MasterService.UpdateDriver(id, this.form.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.form.reset();
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }


  deleteData(id: number) {
    this.MasterService.DeleteDriver(id).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }
}
