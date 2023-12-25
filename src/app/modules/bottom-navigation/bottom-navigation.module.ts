import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular';
import { BottomNavigationComponent } from './bottom-navigation.component';


const PAGES = [
    BottomNavigationComponent
]

const COMPONENTS = [
    
]

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
            },

            // {
            //     path: 'jobdesk',
            //     outlet: 'jobdeskTab',
            //     component: NSEmptyOutletComponent,
            //     loadChildren: () => import('~/app/modules/sales/jobdesk/jobdesk.module').then((m) => m.JobdeskModule)
            // },

            // {
            //     path: 'customers',
            //     outlet: 'customersTab',
            //     component: NSEmptyOutletComponent,
            //     loadChildren: () => import('~/app/modules/sales/customers/customers.module').then((m) => m.CustomersModule)
            // },
                        
            // {
            //     path: 'transactions',
            //     outlet: 'transactionsTab',
            //     component: NSEmptyOutletComponent,
            //     loadChildren: () => import('~/app/modules/sales/transactions/transactions.module').then((m) => m.TransactionsModule)
            // },
            // {
            //     path: 'profile',
            //     outlet: 'profileTab',
            //     component: NSEmptyOutletComponent,
            //     loadChildren: () => import('~/app/modules/sales/profile/profile.module').then((m) => m.ProfileModule)
            // }
        ]
    }
];


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes)
    ],

    declarations: [
        ...COMPONENTS,
        ...PAGES
    ],

    providers: [

    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class BottomNavigationModule { }
