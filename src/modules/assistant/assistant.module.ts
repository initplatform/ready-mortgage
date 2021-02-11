/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as assistantComponents from './components';

/* Containers */
import * as assistantContainers from './containers';

/* Guards */
import * as assistantGuards from './guards';

/* Services */
import * as assistantServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...assistantServices.services, ...assistantGuards.guards],
    declarations: [...assistantContainers.containers, ...assistantComponents.components],
    exports: [...assistantContainers.containers, ...assistantComponents.components],
})
export class AssistantModule {}
