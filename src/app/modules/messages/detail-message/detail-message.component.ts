import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ObservableArray, Page } from '@nativescript/core';
import { Store } from '@ngrx/store';
import { RadListView } from 'nativescript-ui-listview';
import { formatDateTime } from '~/app/helpers';
import { ChatMessageService, FcmService, UserService } from '~/app/services';
import { increment, decrement, reset } from '~/app/actions';

@Component({
    selector: 'ns-detail-message',
    templateUrl: './detail-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailMessageComponent implements OnInit, AfterViewInit {
    public queryParams: any;
    public avatar: string;
    public name: string;

    private _radlistView: RadListView;
    private _messages: ObservableArray<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _chatMessageService: ChatMessageService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fcmService: FcmService,
        private _routerExtensions: RouterExtensions,
        private _store: Store<{ count: number }>,
        private _userService: UserService,
    ) {
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
        this.queryParams = this._activatedRoute.snapshot.queryParams;

        this.avatar = this.queryParams.avatar;
        this.name = this.queryParams.name;

        // Listen for FCM event
        this._fcmService.listenFcmEvent()
            .subscribe({
                next: (chat: any) => {
                    this._messages.push({
                        message: chat.message,
                        position: 'left',
                        timestamp: formatDateTime(chat.message_time)
                    });

                    this.scrollToLastMessage();
                }
            });
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

    onRadlistViewLoaded(args: any) {
        this._radlistView = args.object as RadListView;

        // Load messages
        this.loadMessages()
            .then(() => {
                this.scrollToLastMessage();
            }).catch((err: any) => {
                alert(err);
            });
    }

    loadMessages(page = 1): Promise<void> {
        return new Promise((resolve, reject) => {
            const user = this._userService.getUser();

            this._chatMessageService.get({ chat_id: this.queryParams.id, page: String(1) })
                .subscribe({
                    next: (res: any) => {
                        const data = res?.data || [];

                        data.sort((a: any, b: any) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateA.getTime() - dateB.getTime();
                        }).forEach((obj: any) => {
                            this._messages.push({
                                message: obj.message,
                                position: Number(obj.user_id) === Number(user.id) ? 'right' : 'left',
                                timestamp: formatDateTime(obj.created_at)
                            });
                        });

                        resolve();
                    },
                    error: (err: any) => {
                        reject(JSON.stringify(err));
                    }
                });
        });
    }

    scrollToLastMessage() {
        const lastMessageIndex = this._messages.length - 1;
        if (this._radlistView) {
            this._radlistView.scrollToIndex(lastMessageIndex, false);
        }
    }

    goBack(): void {
        this._routerExtensions.back();
    }

    sendMessage(): void {
        this._store.dispatch(increment());
    }
} 
