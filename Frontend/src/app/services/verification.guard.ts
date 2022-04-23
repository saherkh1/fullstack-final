import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
    constructor(private notify: NotifyService,private router: Router) { }
    canActivate(): boolean {
        if(store.getState().authState.user?.verified) return true;
        this.notify.error("you are not logged-in")
        this.router.navigateByUrl("/login");
        return false;
    }
}
