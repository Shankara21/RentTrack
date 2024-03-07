import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { headers, loggedInHeaders } from 'src/app/helpers/headers';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, private router: Router) { }


  // Login
  Login(data: any) {
    return this.http.post(environment.apiUrl + '/auth/login', data, headers)
  }
  // Register
  Register(data: any) {
    return this.http.post(environment.apiUrl + '/auth/register', data, headers)
  }
  // Logout
  Logout() {
    return this.http.post(environment.apiUrl + '/auth/logout', {}, loggedInHeaders)
  }

  // GetProfile
  GetProfile() {
    return this.http.get(environment.apiUrl + '/auth', loggedInHeaders)
  }

  // Driver
  GetDrivers() {
    return this.http.get(environment.apiUrl + '/drivers', loggedInHeaders)
  }
  ShowDriver(id: number) {
    return this.http.get(environment.apiUrl + '/drivers/' + id, loggedInHeaders)
  }
  AddDriver(data: any) {
    return this.http.post(environment.apiUrl + '/drivers', data, loggedInHeaders)
  }
  UpdateDriver(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/drivers/' + id, data, loggedInHeaders)
  }
  DeleteDriver(id: number) {
    return this.http.delete(environment.apiUrl + '/drivers/' + id, loggedInHeaders)
  }

  // Location
  GetLocations() {
    return this.http.get(environment.apiUrl + '/locations', loggedInHeaders)
  }
  ShowLocation(id: number) {
    return this.http.get(environment.apiUrl + '/locations/' + id, loggedInHeaders)
  }
  AddLocation(data: any) {
    return this.http.post(environment.apiUrl + '/locations', data, loggedInHeaders)
  }
  UpdateLocation(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/locations/' + id, data, loggedInHeaders)
  }
  DeleteLocation(id: number) {
    return this.http.delete(environment.apiUrl + '/locations/' + id, loggedInHeaders)
  }

  // Vehicle
  GetVehicles() {
    return this.http.get(environment.apiUrl + '/vehicles', loggedInHeaders)
  }
  ShowVehicle(id: number) {
    return this.http.get(environment.apiUrl + '/vehicles/' + id, loggedInHeaders)
  }
  AddVehicle(data: any) {
    return this.http.post(environment.apiUrl + '/vehicles', data, loggedInHeaders)
  }
  UpdateVehicle(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/vehicles/' + id, data, loggedInHeaders)
  }
  DeleteVehicle(id: number) {
    return this.http.delete(environment.apiUrl + '/vehicles/' + id, loggedInHeaders)
  }

  // Rental Company
  GetRentalCompanies() {
    return this.http.get(environment.apiUrl + '/rental-companies', loggedInHeaders)
  }
  ShowRentalCompany(id: number) {
    return this.http.get(environment.apiUrl + '/rental-companies/' + id, loggedInHeaders)
  }
  AddRentalCompany(data: any) {
    return this.http.post(environment.apiUrl + '/rental-companies', data, loggedInHeaders)
  }
  UpdateRentalCompany(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/rental-companies/' + id, data, loggedInHeaders)
  }
  DeleteRentalCompany(id: number) {
    return this.http.delete(environment.apiUrl + '/rental-companies/' + id, loggedInHeaders)
  }

  // User
  GetUsers() {
    return this.http.get(environment.apiUrl + '/users', loggedInHeaders)
  }
  ShowUser(id: number) {
    return this.http.get(environment.apiUrl + '/users/' + id, loggedInHeaders)
  }
  AddUser(data: any) {
    return this.http.post(environment.apiUrl + '/users', data, loggedInHeaders)
  }
  UpdateUser(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/users/' + id, data, loggedInHeaders)
  }
  DeleteUser(id: number) {
    return this.http.delete(environment.apiUrl + '/users/' + id, loggedInHeaders)
  }

  // Order
  GetOrders() {
    return this.http.get(environment.apiUrl + '/orders', loggedInHeaders)
  }
  ShowOrder(id: string) {
    return this.http.get(environment.apiUrl + '/orders/' + id, loggedInHeaders)
  }
  AddOrder(data: any) {
    return this.http.post(environment.apiUrl + '/orders', data, loggedInHeaders)
  }
  DeleteOrder(id: number) {
    return this.http.delete(environment.apiUrl + '/orders/' + id, loggedInHeaders)
  }
  ChangeStatus(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/orders/' + id + '/status', data, loggedInHeaders)
  }

  // Role
  GetRoles() {
    return this.http.get(environment.apiUrl + '/roles', loggedInHeaders)
  }

  // Approval
  GetApprovals() {
    return this.http.get(environment.apiUrl + '/approvals', loggedInHeaders)
  }
  ShowApproval(id: number) {
    return this.http.get(environment.apiUrl + '/approvals/' + id, loggedInHeaders)
  }
  AddApproval(data: any) {
    return this.http.post(environment.apiUrl + '/approvals', data, loggedInHeaders)
  }
  UpdateApproval(id: number, data: any) {
    return this.http.put(environment.apiUrl + '/approvals/' + id, data, loggedInHeaders)
  }
  DeleteApproval(id: number) {
    return this.http.delete(environment.apiUrl + '/approvals/' + id, loggedInHeaders)
  }

  // Get approval by order id
  GetApprovalByOrderId(id: number) {
    return this.http.get(environment.apiUrl + '/approvals/order/' + id, loggedInHeaders)
  }

  // Get Statistics
  GetStatistics() {
    return this.http.get(environment.apiUrl + '/statistics', loggedInHeaders)
  }

}
