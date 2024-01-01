import { NgModule, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { DetailMessageComponent } from './modules/messages/detail-message/detail-message.component';
import { AuthGuard } from './services';


const ROUTES: Routes = [
    { path: '', redirectTo: 'bottom-navigation', pathMatch: 'full' },
    { 
        path: 'bottom-navigation',
        loadChildren: () => import('./modules/bottom-navigation/bottom-navigation.module').then((m) => m.BottomNavigationModule),
        canActivate: [() => inject(AuthGuard).canActivate()]
    },
    { path: 'detail-message', component: DetailMessageComponent },
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(ROUTES)
    ],

    exports: [
        NativeScriptRouterModule
    ]
})

export class AppRoutingModule {}
