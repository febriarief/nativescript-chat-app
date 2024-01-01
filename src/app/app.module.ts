import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Application } from '@nativescript/core';
import { TNSImageModule } from "@nativescript-community/ui-image/angular";
import * as imageModule from "@nativescript-community/ui-image";
import { StoreModule } from '@ngrx/store';
import { NativeScriptNgRxDevtoolsModule } from '@valor/nativescript-ngrx-devtools';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { counterReducer } from '~/app/reducers';
import { DetailMessageComponent } from './modules/messages/detail-message/detail-message.component';
import { AuthGuard, ExtendedHttpInterceptor, FcmService } from './services';


if (Application.android) {
    Application.on("launch", () => {
        imageModule.initialize({ isDownsampleEnabled: true })
    });
}


@NgModule({
    bootstrap: [
        AppComponent
    ],

    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptNgRxDevtoolsModule.forRoot(),
        SharedModule,
        StoreModule.forRoot({ count: counterReducer }),
        TNSImageModule
    ],

    declarations: [
        AppComponent,
        DetailMessageComponent
    ],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExtendedHttpInterceptor,
            multi: true
        },
        AuthGuard,
        FcmService
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule {}
