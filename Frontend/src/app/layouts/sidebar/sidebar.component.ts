import { MasterService } from 'src/app/services/master/master.service';
import { AlertService } from 'src/app/services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  theme: string = 'system';
  constructor(private router: Router, private authService: AuthService, private AlertService: AlertService, private MasterService: MasterService, private spinner: NgxSpinnerService) {
    this.theme = localStorage.getItem('theme') || 'system';
  }

  user: any;
  ngOnInit() {
    this.MasterService.GetProfile().subscribe((response: any) => {
      this.user = response.data;
    })
  }

  logOut() {
    this.spinner.show();
    this.MasterService.Logout().subscribe((response: any) => {
      this.authService.DeleteToken();
    }, (error: any) => {
      console.log(error);

      this.AlertService.onAlert('Internal Server Error', 'danger');
      this.spinner.hide();
    }, () => {
      this.AlertService.onAlert('Log out successfully', 'success');
      window.location.href = '/login';
      this.spinner.hide();
    });
  }
}
