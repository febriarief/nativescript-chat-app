import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";

@Component({
    selector: 'ns-bottom-navigation',
    templateUrl: "./bottom-navigation.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BottomNavigationComponent implements AfterViewInit 
{
    public selectedIndex: number;

    private _isModuleLoaded: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _page: Page,
        private _routerExtensions: RouterExtensions
    ) {
        this._page.actionBarHidden = true;
        this._isModuleLoaded = {
            home: false,
            jobdesk: false,
            customers: false,
            transactions: false,
            profile: false
        };
    }

    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     *
     * @returns void
     */
    ngAfterViewInit(): void {
        this.switchTabByIndex(0);
    }

    /**
     * Handle event on index of bottom sheet navigation
     * value change callback
     * 
     * @param index number 
     */
    switchTabByIndex(index: number): void {
        this.selectedIndex = index;
        this._changeDetectorRef.detectChanges();
        
        switch(index) {
            case 0:
                this._loadModule('messages');
                break;
            default:
                break;
        }
    }

    /**
     * Loads a module for a specified outlet if it has not been loaded already.
     * @param outlet - The outlet for which the module should be loaded.
     * 
     * @returns void
     */
    private _loadModule(outlet: any): void {
        if (this._isModuleLoaded[outlet] === true) return; 
        this._isModuleLoaded[outlet] = true;

        const outlets = {
            messages: {messagesTab: ["messages"]}
        };

        this._routerExtensions.navigate([{outlets: outlets[outlet]}], {
            relativeTo: this._activatedRoute
        });
    }
}