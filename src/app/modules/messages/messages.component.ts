import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ObservableArray, Page, PageTransition, Screen, SharedTransition, SharedTransitionConfig } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { environment } from '~/environments/environment';
import { ChatService } from '~/app/services';
import { formatDateTime } from '~/app/helpers';

@Component({
    selector: 'ns-messages',
    templateUrl: './messages.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessagesComponent implements OnInit
{
    private _messages: ObservableArray<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _page: Page,
        private _routerExtensions: RouterExtensions
    ) {
        this._page.actionBarHidden = true;
        this._messages = new ObservableArray();
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
        // Load chats
        this._chatService.get()
        .subscribe({
            next: (res: any) => {
                const chats = res?.data || [];
                chats.forEach((chat: any) => {
                    const lastMessage = chat.last_message;
                    const friend = lastMessage.user;

                    this._messages.push({
                        id: chat.id,
                        avatar: `${environment.imageUrl}/avatar/${friend.avatar}`,
                        name: friend.name,
                        message_time: formatDateTime(lastMessage.created_at),
                        message: lastMessage.message
                    });
                });
            },
            error: (err: any) => {
                
            }
        });
    }

    viewMessage(args: any): void {
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

        const chat = this._messages.getItem(args.index);
        this._routerExtensions.navigate(["/detail-message"], {
            queryParams: chat,
            animated: true,
            transition: SharedTransition.custom(new PageTransition(), config),
        });
    }
} 
