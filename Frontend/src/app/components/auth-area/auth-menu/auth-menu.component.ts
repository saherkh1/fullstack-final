import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-auth-menu',
    templateUrl: './auth-menu.component.html',
    styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit, OnDestroy {

    public user: UserModel;
    public unsubscribeMe: Unsubscribe;


    constructor() { }
    ngOnInit(): void {
        store.subscribe(() => {
            this.user = store.getState().authState.user;
        });

    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
