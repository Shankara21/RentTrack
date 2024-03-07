import { AlertService } from './services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starter_angular';
  constructor(private spinner: NgxSpinnerService, private AlertService: AlertService, public router: Router) {
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    //   this.AlertService.onAlert('Welcome to Angular 15 Starter', 'success', 10000);
    // }, 1000);
  }
}
