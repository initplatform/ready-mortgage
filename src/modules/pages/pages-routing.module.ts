/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { PagesModule } from './pages.module';

/* Containers */
import * as pagesContainers from './containers';

/* Guards */
import * as pagesGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic-page',
    },
    {
        path: 'basic-page',
        data: {
            title: 'Basic Page - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.BasicPageComponent,
    },
    {
        path: 'about',
        data: {
            title: 'About - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.AboutComponent,
    },
    {
        path: 'pricing',
        data: {
            title: 'Pricing - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.PricingComponent,
    },
    {
        path: 'contact',
        data: {
            title: 'Contact - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.ContactComponent,
    },
    {
        path: 'team',
        data: {
            title: 'Team - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.TeamComponent,
    },
    {
        path: 'terms',
        data: {
            title: 'Terms - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.TermsComponent,
    },
    {
        path: 'help-center',
        data: {
            title: 'Help Center - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.HelpCenterComponent,
    },
    {
        path: 'knowledgebase',
        data: {
            title: 'Knowledgebase - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.KnowledgebaseComponent,
    },
    {
        path: 'message-center',
        data: {
            title: 'Message Center - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.MessageCenterComponent,
    },
    {
        path: 'support-ticket',
        data: {
            title: 'Support Ticket - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.SupportTicketComponent,
    },
    {
        path: 'careers-list',
        data: {
            title: 'Careers List - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.CareersListComponent,
    },
    {
        path: 'position-details',
        data: {
            title: 'Position Details - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.PositionDetailsComponent,
    },
    {
        path: 'overview',
        data: {
            title: 'Overview - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.OverviewComponent,
    },
    {
        path: 'post',
        data: {
            title: 'Post - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.PostComponent,
    },
    {
        path: 'archive',
        data: {
            title: 'Archive - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.ArchiveComponent,
    },
    {
        path: 'grid',
        data: {
            title: 'Grid - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.GridComponent,
    },
    {
        path: 'large-grid',
        data: {
            title: 'Large Grid - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.LargeGridComponent,
    },
    {
        path: 'masonry',
        data: {
            title: 'Masonry - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.MasonryComponent,
    },
    {
        path: 'case-study',
        data: {
            title: 'Case Study - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.CaseStudyComponent,
    },
    {
        path: 'project',
        data: {
            title: 'Project - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.ProjectComponent,
    },
    {
        path: 'error-400',
        data: {
            title: 'Error 400 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error400Component,
    },
    {
        path: 'error-401',
        data: {
            title: 'Error 401 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error401Component,
    },
    {
        path: 'error-403',
        data: {
            title: 'Error 403 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error403Component,
    },
    {
        path: 'error-404-1',
        data: {
            title: 'Error 404 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error4041Component,
    },
    {
        path: 'error-404-2',
        data: {
            title: 'Error 404 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error4042Component,
    },
    {
        path: 'error-500',
        data: {
            title: 'Error 500 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error500Component,
    },
    {
        path: 'error-503',
        data: {
            title: 'Error 503 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error503Component,
    },
    {
        path: 'error-504',
        data: {
            title: 'Error 504 - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: pagesContainers.Error504Component,
    },
];

@NgModule({
    imports: [PagesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
