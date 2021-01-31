import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('modules/landings/landings-routing.module').then((m) => m.LandingsRoutingModule),
    },
    {
        path: 'landings',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/landings/landings-routing.module').then((m) => m.LandingsRoutingModule),
    },
    {
        path: 'pages',
        loadChildren: () =>
            import('modules/pages/pages-routing.module').then((m) => m.PagesRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then((m) => m.ErrorRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/app-common/app-common-routing.module').then(
                (m) => m.AppCommonRoutingModule
            ),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then((m) => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
