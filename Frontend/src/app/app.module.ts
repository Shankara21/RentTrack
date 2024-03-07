import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { DriverComponent } from './pages/driver/driver.component';
import { LocationComponent } from './pages/location/location.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { RentalCompanyComponent } from './pages/rental-company/rental-company.component';
import { OrderIndexComponent } from './pages/order/order-index/order-index.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { ApprovalComponent } from './pages/approval/approval.component';
import { ReportComponent } from './pages/report/report.component';
import { UserComponent } from './pages/user/user.component';
import { ExportAsModule } from 'ngx-export-as';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ThemeSwitcherComponent,
    DriverComponent,
    LocationComponent,
    VehicleComponent,
    RentalCompanyComponent,
    OrderIndexComponent,
    OrderDetailsComponent,
    ApprovalComponent,
    ReportComponent,
    UserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ExportAsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
