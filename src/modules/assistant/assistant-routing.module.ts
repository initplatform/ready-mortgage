/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AssistantModule } from './assistant.module';

/* Containers */
import * as assistantContainers from './containers';

/* Components */
import * as assistantComponents from './components';

/* Guards */
import * as assistantGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'assistant',
    },
    {
        path: 'assistant',
        component: assistantContainers.AssistantComponent,
        children: [
            {
                path: '',
                data: {
                    title: 'Home - Ready Mortgage',
                } as SBRouteData,
                component: assistantContainers.HomeComponent,
            },
            {
                path: 'purpose',
                data: {
                    title: 'Purpose - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponents.PurposeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [AssistantModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AssistantRoutingModule {}
