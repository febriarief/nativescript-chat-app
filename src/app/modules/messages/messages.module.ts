import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '~/app/shared/shared.module';
import { MessagesComponent } from './pages';

const COMPONENTS = [

];

const PAGES = [
    MessagesComponent
];

const routes: Routes = [
    { path: '', component: MessagesComponent }
];


@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],

    exports: [
        ...COMPONENTS,
        ...PAGES
    ],

    declarations: [
        ...COMPONENTS,
        ...PAGES
    ],

    providers: [

    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class MessagesModule {}
