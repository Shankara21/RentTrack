import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService) { }

  datas: any;
  data: any;
  config = paginationConfig;
  formCreate = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role_id: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  });

  formEdit = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role_id: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    old_password: new FormControl(''),
  })

  roles: any;
  role_colors = [
    { id: 1, color: 'bg-red-500' },
    { id: 2, color: 'bg-green-500' },
    { id: 3, color: 'bg-blue-500' },
    { id: 4, color: 'bg-yellow-500' }
  ];


  ngOnInit() {
    this.spinner.show();
    this.getData();
  }


  getData() {
    forkJoin([
      this.MasterService.GetUsers(),
      this.MasterService.GetRoles(),
    ]).subscribe(([users, roles]: any) => {
      this.datas = users.data;
      this.roles = roles.data;
      this.datas.forEach((element: any) => {
        element.index = this.datas.indexOf(element) + 1;
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  showData(id: number) {
    this.spinner.show();
    this.MasterService.ShowUser(id).subscribe((response: any) => {
      this.data = response.data;
      this.formEdit.patchValue({
        name: this.data.name,
        email: this.data.email,
        role_id: this.data.role_id,
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }


  createData() {
    if (this.formCreate.invalid) {
      this.AlertService.onAlert(
        'Form invalid!'
        , 'warning');
      return;
    }
    this.MasterService.AddUser(this.formCreate.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.formCreate.reset();
    }, (error: any) => {
      this.AlertService.onAlert(error.error.message, 'danger');
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }


  updateData(id: number) {
    if (this.formEdit.invalid) {
      this.AlertService.onAlert('Form invalid!', 'warning');
      return;
    }
    this.MasterService.UpdateUser(id, this.formEdit.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.formEdit.reset();
    }, (error: any) => {
      this.formEdit.reset();
      this.AlertService.onAlert(error.error.message, 'danger'); this.spinner.hide();
    });
  }


  deleteData(id: number) {
    this.MasterService.DeleteUser(id).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }
}
