import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { TNSImageModule } from "@nativescript-community/ui-image/angular";
import * as imageModule from "@nativescript-community/ui-image";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { Application } from '@nativescript/core';
import { DetailMessageComponent } from './modules/messages/pages';


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
        SharedModule,
        TNSImageModule
    ],

    declarations: [
        AppComponent,
        DetailMessageComponent,
        ItemsComponent,
        ItemDetailComponent
    ],

    providers: [

    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule {}
