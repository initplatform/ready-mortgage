/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as landingsComponents from './components';

/* Containers */
import * as landingsContainers from './containers';

/* Guards */
import * as landingsGuards from './guards';

/* Services */
import * as landingsServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...landingsServices.services, ...landingsGuards.guards],
    declarations: [...landingsContainers.containers, ...landingsComponents.components],
    exports: [...landingsContainers.containers, ...landingsComponents.components],
})
export class LandingsModule {}
