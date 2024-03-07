import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  invokeAlert = new EventEmitter();
  subsVar: Subscription | undefined;

  onAlert(message: string, type: 'success' | 'warning' | 'danger' | 'info', timeout: number = 3000) {
    this.invokeAlert.emit({ message, type, timeout });
  }
}
