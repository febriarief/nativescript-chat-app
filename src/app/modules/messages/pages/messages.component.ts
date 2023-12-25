import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ObservableArray, Page, PageTransition, Screen, SharedTransition, SharedTransitionConfig } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { MessageModel } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-messages',
    templateUrl: './messages.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessagesComponent implements OnInit
{
    private _messages: ObservableArray<MessageModel>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _page: Page,
        private _routerExtensions: RouterExtensions
    ) {
        this._page.actionBarHidden = true;
    }

    get messages(): ObservableArray<MessageModel> {
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
            { 
                id: 'id', 
                user_id: 'user_id', 
                avatar: '~/assets/images/zee.png', 
                name: 'Azizi', 
                message: 'Kapan pulang? aku kangen', 
                message_date: '2023-12-24', 
                message_time: '13:01',
                status: 'unread'
            }
        );
    }

    viewMessage(args): void {
        const config: SharedTransitionConfig = {
            pageStart: {
                x: Screen.mainScreen.widthDIPs,
                y: 0
            },
            pageEnd: {
                duration: 250,
                opacity: 1
            }
        };

        this._routerExtensions.navigate(["/detail-message"], {
            animated: true,
            transition: SharedTransition.custom(new PageTransition(), config),
        });
    }
} 
