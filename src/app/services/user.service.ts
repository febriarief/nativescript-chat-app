import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '~/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable()

export class UserService
{
    private _apiUrl: string;
    private _endPoint: string;

    constructor(
        private _localStorageService: LocalStorageService,
        private _httpClient: HttpClient
    ) {
        this._apiUrl = environment.apiUrl;
        this._endPoint = 'users';
    }

    getUser() {
        // const currentUser = this._localStorageService.get('currentUser');
        // if (currentUser?.user) return currentUser.user;
        // return null;


        // Should be remove after login page done!
        const user = {
            id: 1,
            email: 'sample@email.test',
            name: 'Azizi',
            fcm_token: 'fW498aVnTfetLoWIxWdK3e:APA91bFGf9gIWz89eVoOn3HaDSfeZbjFncz300UbOOQgYQskHKaC4L-M7f60mEvt76Itb5Rae8wq2YFOBnsftGXYRvagmRDk5vlfk0nHb5mLrV9mUso_KrNvzFj9_KmtcjQPgMbxaFfp',
            avatar: 'zee.png'
        };
        if (!this._localStorageService.get('currentUser')) this._localStorageService.save('currentUser', {user});
        return user;
    }

    /**
     * Send POST request to set FCM token
     * 
     * @param fcm_token string
     * @returns Observable<Object>
     */
    setFcm(fcm_token: string): Observable<Object> {
        return this._httpClient.post(`${this._apiUrl}/${this._endPoint}/set-fcm`, { fcm_token });
    }
}
