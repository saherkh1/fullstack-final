import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

    constructor(private notify: NotifyService, private router: Router) { }
    canActivate(): boolean {
        if (store.getState().authState.user?.verified)
            if (store.getState().authState.user?.role === "admin") return true;
            else {
                this.notify.error("You are not authorized")
                this.router.navigateByUrl("/home");
                return false;
            }
        else {
            this.notify.error("Fill in your information to continue")
            this.router.navigateByUrl("/validation");
            return false;
        }
    }


}
