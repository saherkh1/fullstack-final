import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IncompleteGuard implements CanDeactivate<unknown> {

    public static canLeave: boolean = true;

    canDeactivate(): boolean {

        if(!IncompleteGuard.canLeave) {
            IncompleteGuard.canLeave = window.confirm("You didn't completed filling the form.\nAre you sure you want to leave?");
        }

        return IncompleteGuard.canLeave;
    }

}
