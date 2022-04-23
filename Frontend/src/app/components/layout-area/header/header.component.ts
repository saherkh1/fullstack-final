import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import { ApplicationConstants } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { searchService } from 'src/app/services/search.service';

// ng g c components/layout-area/header

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public user: UserModel;
    public role: string;
    public unsubscribeMe: Unsubscribe;
    public supermarketName: string;
    public searchText = '';

    public text = `somedummy text here`;

    constructor() { }
    ngOnInit(): void {
        this.supermarketName = ApplicationConstants.superMarketName;
        store.subscribe(() => {
            this.user = store.getState().authState.user;
            this.role = this.user?.role
        });
    }

    public getSuggestion(text: string) {
        searchService.setSearchText(text);
        console.log("the header says " + text);
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }


}
