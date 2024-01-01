import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()

export class ChatService extends AppService
{
    constructor(
        protected httpClient: HttpClient
    ) {
        super(httpClient);

        this.endPoint = 'chat';
    }
}
