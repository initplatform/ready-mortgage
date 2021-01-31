/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as pagesComponents from './components';

/* Containers */
import * as pagesContainers from './containers';

/* Guards */
import * as pagesGuards from './guards';

/* Services */
import * as pagesServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...pagesServices.services, ...pagesGuards.guards],
    declarations: [...pagesContainers.containers, ...pagesComponents.components],
    exports: [...pagesContainers.containers, ...pagesComponents.components],
})
export class PagesModule {}
