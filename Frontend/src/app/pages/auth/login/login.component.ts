import { AuthService } from './../../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from './../../../services/utils/alert/alert.service';
import { MasterService } from './../../../services/master/master.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private MasterService: MasterService, private AlertService: AlertService, private spinner: NgxSpinnerService, private router: Router, private AuthService: AuthService) { }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    this.spinner.show();
    this.MasterService.Login(this.form.value).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.AlertService.onAlert(response.message, 'success');
        this.AuthService.SetToken(response.data.token);
        window.location.href = '/home';
      },
      (error: any) => {
        this.spinner.hide();
        this.AlertService.onAlert(error.error.message, 'danger');
      }
    );
  }
}
