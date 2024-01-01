import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { LocalNotifications } from '@nativescript/local-notifications';
import { Observable, Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()

export class FcmService
{
    private _messageEventSubject: Subject<any>;

    constructor(
        private _userService: UserService,
    ) {
        this._messageEventSubject = new Subject();
    }

    /**
     * Initialize firebase
     * 
     * @returns void
     */
    init(): void {
        const fcm = firebase().messaging();
        fcm.getToken()
        .then(fcm_token => this._updateFcmToken(fcm_token));

        fcm.onMessage((remoteMessage) => {
            if (remoteMessage.data) {
                const data = remoteMessage.data;
            }
        });
    }

    /**
     * Store / update user's FCM token
     * 
     * @param fcm_token string
     * @returns void 
     */
    private _updateFcmToken(fcm_token: string): void {
        this._userService.setFcm(fcm_token).subscribe();
    }

    private _showLocalNotif(title: string, body: string) {
        LocalNotifications.schedule([
            {
                title,
                body,
                thumbnail: true,
                // image: 'https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg',
                at: new Date(new Date().getTime() + 100) // delay 100 milisecond
            },
        ]).then(
            (scheduledIds) => {
                // console.log('Notification id(s) scheduled: ' + JSON.stringify(scheduledIds));
            },
            (error) => {
                // console.log('scheduling error: ' + error);
            }
        );
    }

    listenFcmEvent(): Observable<any> {
        return this._messageEventSubject.asObservable();
    }
}
