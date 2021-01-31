/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { LandingsModule } from './landings.module';

/* Containers */
import * as landingsContainers from './containers';

/* Guards */
import * as landingsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        data: {
            title: 'Dashboard - SB UI Kit Pro Angular',
        } as SBRouteData,
        component: landingsContainers.HomeComponent,
    },
    {
        path: 'landings',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'multipurpose',
            },
            {
                path: 'mobile-app',
                data: {
                    title: 'Mobile App - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.MobileAppComponent,
            },
            {
                path: 'desktop-app',
                data: {
                    title: 'Desktop App - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.DesktopAppComponent,
            },
            {
                path: 'multipurpose',
                data: {
                    title: 'Multipurpose - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.MultiPurposeComponent,
            },
            {
                path: 'agency',
                data: {
                    title: 'Agency - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.AgencyComponent,
            },
            {
                path: 'press',
                data: {
                    title: 'Press - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.PressComponent,
            },
            {
                path: 'directory',
                data: {
                    title: 'Directory - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.DirectoryComponent,
            },
            {
                path: 'rental',
                data: {
                    title: 'Rental - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.RentalComponent,
            },
            {
                path: 'real-estate',
                data: {
                    title: 'Real Estate - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.RealEstateComponent,
            },
            {
                path: 'classifieds',
                data: {
                    title: 'Classifieds - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.ClassifiedsComponent,
            },
            {
                path: 'lead-capture',
                data: {
                    title: 'Lead Capture - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.LeadCaptureComponent,
            },
            {
                path: 'video-feature',
                data: {
                    title: 'Video Feature - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.VideoFeatureComponent,
            },
            {
                path: 'resume',
                data: {
                    title: 'Resume - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.ResumeComponent,
            },
            {
                path: 'portfolio',
                data: {
                    title: 'Portfolio - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.PortfolioComponent,
            },
            {
                path: 'basic',
                data: {
                    title: 'Basic - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.BasicComponent,
            },
            {
                path: 'basic-signup',
                data: {
                    title: 'Basic (Signup) - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.BasicSignupComponent,
            },
            {
                path: 'graphic',
                data: {
                    title: 'Graphic - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.GraphicComponent,
            },
            {
                path: 'graphic-signup',
                data: {
                    title: 'Graphic (Signup) - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.GraphicSignupComponent,
            },
            {
                path: 'inner-page',
                data: {
                    title: 'Inner Page - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.InnerPageComponent,
            },
            {
                path: 'nav-only',
                data: {
                    title: 'Nav Only - SB UI Kit Pro Angular',
                } as SBRouteData,
                component: landingsContainers.NavOnlyComponent,
            },
        ],
    },
];

@NgModule({
    imports: [LandingsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LandingsRoutingModule {}
