import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private cartService: CartService,private authService: AuthService,private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
      this.authService.logout();
      this.cartService.cleanCartStore();
      this.notify.success("you are logged-out");
      this.router.navigateByUrl("/home");
  }

}
