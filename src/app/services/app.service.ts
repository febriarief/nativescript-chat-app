import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~/environments/environment';

@Injectable()

export abstract class AppService
{
    protected apiUrl: string;
    protected endPoint: string;

    constructor(
        protected httpClient: HttpClient
    ) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Send HTTP request use GET method.
     * 
     * @param params {[key: string]: string}
     * @returns Observable<object>
     */
    get(params?: {[key: string]: string}): Observable<object> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key]) httpParams = httpParams.append(key, params[key])
            });
        }

        return this.httpClient.get(`${this.apiUrl}/${this.endPoint}`, { params: httpParams });
    }
}
