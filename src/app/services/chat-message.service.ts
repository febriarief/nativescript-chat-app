import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ChatMessageService extends AppService
{
    constructor(
        protected httpClient: HttpClient
    ) {
        super(httpClient);
        this.endPoint = 'chat-message';
    }
}
