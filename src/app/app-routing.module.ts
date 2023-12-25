import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { DetailMessageComponent } from './modules/messages/pages';


const ROUTES: Routes = [
    { path: '', redirectTo: 'detail-message', pathMatch: 'full' },
    { 
        path: 'bottom-navigation',
        loadChildren: () => import('./modules/bottom-navigation/bottom-navigation.module').then((m) => m.BottomNavigationModule) 
    },
    { path: 'detail-message', component: DetailMessageComponent },


    { path: 'items', component: ItemsComponent },
    { path: 'item/:id', component: ItemDetailComponent },
]

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(ROUTES)
    ],

    exports: [
        NativeScriptRouterModule
    ]
})

export class AppRoutingModule {}
