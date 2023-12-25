import { DatePipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],

    declarations: [
        
    ],

    exports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],

    providers: [
        DatePipe,
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule {

    // static forRoot(): ModuleWithProviders<SharedModule> {
    //     return {
    //         // ngModule: SharedModule,
    //         // providers: [ AuthenticationService ]
    //     };
    // }

}
