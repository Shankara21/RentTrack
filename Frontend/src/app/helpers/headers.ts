import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth/auth.service";
import { environment } from "../environment";

export const loggedInHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',

    'Authorization': `Bearer ${window.localStorage.getItem(environment.token)}`
  })
};
export const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
}
