import { AlertService } from 'src/app/services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.css']
})
export class OrderIndexComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService) { }

  datas: any;
  data: any;
  config = paginationConfig;
  form = new FormGroup({
    vehicle_id: new FormControl('', [Validators.required]),
    driver_id: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    approvals: new FormControl('',),
  });
  vehicles: any;
  drivers: any;
  users: any;
  dataUsers: any = [];
  formUser: any = [];

  status_colors = [
    { name: 'Pending', color: 'bg-yellow-500' },
    { name: 'Rejected', color: 'bg-red-500' },
    { name: "Loaned", color: 'bg-blue-500' },
    { name: 'Returned', color: 'bg-green-500' }
  ];

  ngOnInit() {
    this.spinner.show();
    this.getData();
  }

  getData() {
    forkJoin([
      this.MasterService.GetOrders(),
      this.MasterService.GetVehicles(),
      this.MasterService.GetDrivers(),
      this.MasterService.GetUsers()
    ]).subscribe(([orders, vehicles, drivers, users]: any) => {
      this.datas = orders.data;
      this.vehicles = vehicles.data;
      this.drivers = drivers.data;
      this.users = users.data;
      this.datas.forEach((element: any) => {
        element.index = this.datas.indexOf(element) + 1;
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  addDataUser(e: any) {
    if (this.formUser.includes(e.target.value)) {
      return this.AlertService.onAlert('User already added!', 'warning');
    }
    this.formUser.push(e.target.value);
    const user = this.users.find((user: any) => user.id == e.target.value);
    this.dataUsers.push(user);
  }

  removeDataUser(value: number) {
    const index = this.formUser.indexOf(value);
    this.formUser.splice(index, 1);


    const dataIndex = this.dataUsers.findIndex((user: any) => user.id === value);
    if (dataIndex !== -1) {
      this.dataUsers.splice(dataIndex, 1);
    }

  }

  showData(id: any) {
    this.spinner.show();
    this.MasterService.ShowOrder(id).subscribe((response: any) => {
      this.data = response.data;
      this.form.patchValue({
        vehicle_id: this.data.vehicle_id,
        driver_id: this.data.driver_id,
        start_date: this.data.start_date,
        description: this.data.description,
      });
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  changeStatus(id: any, status: any) {
    this.spinner.show();
    this.MasterService.ChangeStatus(id, { status: status }).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }


  createData() {
    if (this.form.invalid) {
      this.AlertService.onAlert('Form invalid!', 'warning');
      return;
    }
    this.form.value.approvals = this.formUser;
    this.MasterService.AddOrder(this.form.value).subscribe((response: any) => {
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
    this.MasterService.DeleteOrder(id).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }
}
