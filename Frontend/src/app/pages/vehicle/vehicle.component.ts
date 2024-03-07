import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService) { }

  datas: any;
  locations: any;
  rentalCompanies: any;
  data: any;
  config = paginationConfig;
  form = new FormGroup({
    location_id: new FormControl('', [Validators.required]),
    rental_company_id: new FormControl('',),
    number: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    is_owned: new FormControl('', [Validators.required]),
    fuel_consumption: new FormControl('', [Validators.required]),
    last_service: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.spinner.show();
    this.getData();
  }


  getData() {
    forkJoin([
      this.MasterService.GetVehicles(),
      this.MasterService.GetLocations(),
      this.MasterService.GetRentalCompanies()
    ]).subscribe(([vehicles, locations, rentalCompanies]: any) => {
      this.datas = vehicles.data;
      this.locations = locations.data;
      this.rentalCompanies = rentalCompanies.data;
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
    this.MasterService.ShowVehicle(id).subscribe((response: any) => {
      this.data = response.data;
      this.form.patchValue({
        location_id: this.data.location_id,
        rental_company_id: this.data.rental_company_id,
        number: this.data.number,
        type: this.data.type,
        is_owned: this.data.is_owned,
        fuel_consumption: this.data.fuel_consumption,
        last_service: this.data.last_service,
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
    this.MasterService.AddVehicle(this.form.value).subscribe((response: any) => {
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
    this.MasterService.UpdateVehicle(id, this.form.value).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
      this.form.reset();
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }


  deleteData(id: number) {
    this.MasterService.DeleteVehicle(id).subscribe((response: any) => {
      this.ngOnInit();
      this.AlertService.onAlert(response.message, 'success');
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    });
  }
}
