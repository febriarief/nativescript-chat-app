import { Component, OnInit } from '@angular/core'
import { FcmService } from './services';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
})

export class AppComponent implements OnInit
{
    
    constructor(
        private _fcmService: FcmService
    ) {

    }

    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     * 
     * @returns void
     */
    ngOnInit(): void {
        this._fcmService.init();
    }
}
