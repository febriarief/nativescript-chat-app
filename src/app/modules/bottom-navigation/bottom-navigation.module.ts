import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular';
import { BottomNavigationComponent } from './bottom-navigation.component';


const PAGES = [
    BottomNavigationComponent
]

// const COMPONENTS = [
    
// ];

const routes: Routes = [
    {
        path: '',
        component: BottomNavigationComponent,
        children: [
            {
                path: 'messages',
                outlet: 'messagesTab',
                component: NSEmptyOutletComponent,
                loadChildren: () => import('~/app/modules/messages/messages.module').then((m) => m.MessagesModule)
            }
        ]
    }
];


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes)
    ],

    declarations: [
        // ...COMPONENTS,
        ...PAGES
    ],

    providers: [

    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class BottomNavigationModule { }
