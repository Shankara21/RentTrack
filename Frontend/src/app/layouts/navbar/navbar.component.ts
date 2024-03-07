import { AuthService } from './../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from './../../services/master/master.service';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AuthService: AuthService, private router: Router) { }

  greeting: string = 'Good Morning';

  user: any;

  ngOnInit(): void {
    this.spinner.show();
    this.MasterService.GetProfile().subscribe((response: any) => {
      this.AuthService.setUserLoggedIn(response.data);
      this.user = this.AuthService.getUserLoggedIn();
    }, (error: any) => {

      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
    this.updateGreeting();
    setInterval(() => {
      this.updateGreeting();
    }, 3600000);
  }

  updateGreeting() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 12) {
      this.greeting = 'Good Morning';
    } else if (hours < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  logOut() {
    this.AuthService.DeleteToken();
    this.router.navigate(['/login']);
  }
}
