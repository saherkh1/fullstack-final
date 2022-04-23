import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CityModel } from './../../../models/city.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit, OnDestroy {

    public user = new UserModel();
    public cites: CityModel[] = [];
    private flag = true;

    constructor(private cartService: CartService, private http: HttpClient, private myAuthService: AuthService, private notify: NotifyService, private router: Router) { }
   
    ngOnDestroy(): void {
        this.flag && this.router.navigateByUrl("/logout");
    }

    public async Update() {
        try {
            await this.myAuthService.validate(this.user);
            // this.cartService.initCartAsync(this.user._id);
            this.flag = false;
            this.notify.success("You are registered!");
            this.router.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

    async ngOnInit() {
        this.user = await store.getState().authState.user;
        this.cites = await this.http.get<CityModel[]>(environment.cityUrl).toPromise();
    }
}