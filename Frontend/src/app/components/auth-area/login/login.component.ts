import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();
    private user: UserModel;

    constructor(private notify: NotifyService, private authService: AuthService,  private router: Router) { }
    public async login() {
        try {
            await this.authService.login(this.credentials);
            this.user = store.getState().authState.user;
            // this.cartService.initCartAsync(this.user._id);
            if (!this.user?.verified) {
                this.notify.success("Fill in your information to continue");
                this.router.navigateByUrl("/validation");
                return;
            }
            this.notify.success("You are logged-in");
            this.router.navigateByUrl("/home");
        } catch (err: any) {

            this.notify.error(err.message);
        }
    }

}
