import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/utils/alert/alert.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { paginationConfig } from 'src/app/helpers/paginationConfig';
import { MasterService } from 'src/app/services/master/master.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private AlertService: AlertService, private router: Router, private AuthService: AuthService) { }

  params: any = this.router.url.split('/').pop();

  datas: any;
  data: any;
  config = paginationConfig;
  selectedId: any;

  form = new FormGroup({
    status: new FormControl('', [Validators.required]),
  });

  status_colors = [
    { name: 'Pending', color: 'bg-yellow-500' },
    { name: 'Rejected', color: 'bg-red-500' },
    { name: "Loaned", color: 'bg-blue-500' },
    { name: 'Returned', color: 'bg-green-500' }
  ];
  approval_colors = [
    { name: 'Pending', color: 'bg-yellow-500' },
    { name: 'Rejected', color: 'bg-red-500' },
    { name: 'Approved', color: 'bg-green-500' }
  ]
  user: any;
  ngOnInit() {
    this.spinner.show();
    this.getData();
  }

  getData() {
    forkJoin([
      this.MasterService.ShowOrder(this.params),
      this.MasterService.GetProfile()
    ]).subscribe(([
      order,
      profile
    ]: any) => {
      this.data = order.data;
      this.user = profile.data;

      const pendingUser = this.data.approval.filter((element: any) => {
        return element.status === 'Pending' && element.user.role.name !== 'Manager';
      });

      this.data.approval.forEach((element: any) => {
        element.is_allowed = this.user.id === element.user_id;
        if (this.user.role.name === 'Manager') {
          if (pendingUser.length > 0 && element.user.role.name === 'Manager') {
            element.is_allowed = false;
            element.message = `You can't approve this order; pending approvals from other users remain.`
          }
        }
      });
      this.spinner.hide();
    });
  }

  updateData(id: any) {
    this.spinner.show();
    this.MasterService.UpdateApproval(id, this.form.value).subscribe((response: any) => {
      this.AlertService.onAlert("Success", 'success');
      this.getData();
    }, (error: any) => {
      this.AlertService.onAlert("Internal Server Error", 'danger'); this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }
}
