import { MasterService } from 'src/app/services/master/master.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ChartOptions } from 'src/app/ApexChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService) { }

  public LineChartOptions: Partial<ChartOptions> | any;

  vehicles: any;
  locations: any;
  rentalCompanies: any;
  statistics: any;
  ngOnInit() {
    this.spinner.show();
    this.getData();
  }

  getData() {
    forkJoin([
      this.MasterService.GetVehicles(),
      this.MasterService.GetLocations(),
      this.MasterService.GetRentalCompanies(),
      this.MasterService.GetStatistics()
    ]).subscribe(([vehicles, locations, rentalCompanies, stats]: any) => {
      this.vehicles = vehicles.data;
      this.locations = locations.data;
      this.rentalCompanies = rentalCompanies.data;
      this.vehicles.forEach((vehicle: any) => {
        vehicle.index = this.vehicles.indexOf(vehicle) + 1;
      });
      this.locations.forEach((location: any) => {
        location.index = this.locations.indexOf(location) + 1;
      });
      this.rentalCompanies.forEach((rentalCompany: any) => {
        rentalCompany.index = this.rentalCompanies.indexOf(rentalCompany) + 1;
      });
      this.LineChartOptions = {
        series: [
          {
            name: "Amount",
            data: stats.data.orderCount
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Amount of Order",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: stats.data.vehicleName
        }
      };
      this.spinner.hide();
    });
  }
}
