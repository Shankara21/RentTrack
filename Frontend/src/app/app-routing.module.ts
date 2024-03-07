import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthenticationGuard } from './services/middlewares/authentication/authentication.guard';
import { DriverComponent } from './pages/driver/driver.component';
import { LocationComponent } from './pages/location/location.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { RentalCompanyComponent } from './pages/rental-company/rental-company.component';
import { OrderIndexComponent } from './pages/order/order-index/order-index.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { ApprovalComponent } from './pages/approval/approval.component';
import { ReportComponent } from './pages/report/report.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'driver',
    component: DriverComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'vehicle',
    component: VehicleComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'rental-company',
    component: RentalCompanyComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'order',
    component: OrderIndexComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'order/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'approval',
    component: ApprovalComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
