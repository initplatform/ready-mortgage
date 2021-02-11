import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('modules/assistant/assistant-routing.module').then(
                (m) => m.AssistantRoutingModule
            ),
    },
    {
        path: 'assistant',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/assistant/assistant-routing.module').then(
                (m) => m.AssistantRoutingModule
            ),
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
