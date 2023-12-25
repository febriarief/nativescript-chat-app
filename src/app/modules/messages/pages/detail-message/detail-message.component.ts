import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ObservableArray, Page } from '@nativescript/core';
import { RadListView } from 'nativescript-ui-listview';

@Component({
    selector: 'ns-detail-message',
    templateUrl: './detail-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailMessageComponent implements OnInit, AfterViewInit
{
    private _messages: ObservableArray<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _page: Page,
    ) {
        // this._page.actionBarHidden = true;
    }

    get messages(): ObservableArray<any> {
        return this._messages;
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
        this._messages = new ObservableArray(            
            { message: "1. Halo, apa kabar?" },
            { message: "2. Saya baik, terima kasih!" },
            { message: "3. Halo, apa kabar?" },
            { message: "4. Saya baik, terima kasih!" },
            { message: "5. Halo, apa kabar?" },
            { message: "6. Saya baik, terima kasih!" },
            { message: "7. Halo, apa kabar?" },
            { message: "8. Saya baik, terima kasih!" },
        );
    }

    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     *
     * @returns void
     */
    ngAfterViewInit() {

    }

    goBack(): void {

    }
} 
