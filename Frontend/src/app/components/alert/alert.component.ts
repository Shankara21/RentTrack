import { zoomInOutVar } from 'src/app/animation';
import { AlertService } from './../../services/utils/alert/alert.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [zoomInOutVar]
})
export class AlertComponent {

  constructor(private AlertService: AlertService) { }

  isShow: boolean = false;
  message: string = '';
  type: 'success' | 'warning' | 'danger' | 'info' | null = 'success';
  timeout: number = 3000;

  ngOnInit() {
    if (this.AlertService.subsVar == undefined) {
      this.AlertService.subsVar = this.AlertService.invokeAlert.subscribe((alert: any) => {
        this.callAlert(alert);
      })
    }
  }

  callAlert(alert: any) {
    if (alert.message != '') {
      this.isShow = true;
      this.message = alert.message;
      this.type = alert.type;
      this.timeout = alert.timeout;
      setTimeout(() => {
        this.closeAlert();
      }, this.timeout);
    }
  }
  closeAlert() {
    this.message = '';
    this.type = null;
    this.isShow = false;
    this.timeout = 5000;
  }

}
