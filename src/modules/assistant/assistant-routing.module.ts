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
import * as assistantComponentsSteps from './components-steps';

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
        canActivate: [assistantGuards.AssistantGuard],
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
                path: 'purchase-stage',
                data: {
                    title: 'Stage - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.PurchaseStageComponent,
            },
            {
                path: 'remaining-mortgage',
                data: {
                    title: 'Remaining - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.RemainingMortgageComponent,
            },
            {
                path: 'known-home-price',
                data: {
                    title: 'Home Price - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.KnownHomePriceComponent,
            },
            {
                path: 'down-payment',
                data: {
                    title: 'Down Payment - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.DownPaymentComponent,
            },
            {
                path: 'credit-score',
                data: {
                    title: 'Credit Score - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.CreditScoreComponent,
            },
            {
                path: 'income',
                data: {
                    title: 'Income - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.IncomeComponent,
            },
            {
                path: 'debt',
                data: {
                    title: 'Debt - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.DebtComponent,
            },
            {
                path: 'summary',
                data: {
                    title: 'Summary - Ready Mortgage',
                } as SBRouteData,
                component: assistantComponentsSteps.SummaryComponent,
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: '/error/404',
            },
        ],
    },
];

@NgModule({
    imports: [AssistantModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AssistantRoutingModule {}
