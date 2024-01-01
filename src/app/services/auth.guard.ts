import { Injectable } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from './user.service';

@Injectable()

export class AuthGuard 
{
    constructor(
        private _userService: UserService,
        private _routerExtensions: RouterExtensions,
    ) { }

    canActivate() {
        const user = this._userService.getUser();     
        return user ? true : false;
    }
}
