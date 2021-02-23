/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as assistantComponents from './components';
import * as assistantComponentsForms from './components-forms';
import * as assistantComponentsSteps from './components-steps';

/* Containers */
import * as assistantContainers from './containers';

/* Guards */
import * as assistantGuards from './guards';

/* Services */
import * as assistantServices from './services';

/* Store */
import * as assistantStore from './store';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        StoreModule.forFeature(
            assistantStore.assistantReducer.featureKey,
            assistantStore.assistantReducer.assistantReducer
        ),
        EffectsModule.forFeature([assistantStore.AssistantEffects]),
    ],
    providers: [...assistantServices.services, ...assistantGuards.guards],
    declarations: [
        ...assistantContainers.containers,
        ...assistantComponents.components,
        ...assistantComponentsForms.componentsForms,
        ...assistantComponentsSteps.componentsSteps,
    ],
    exports: [
        ...assistantContainers.containers,
        ...assistantComponents.components,
        ...assistantComponentsForms.componentsForms,
        ...assistantComponentsSteps.componentsSteps,
    ],
})
export class AssistantModule {}
