/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AppCommonModule } from './app-common.module';

/* Containers */
import * as utilityContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: utilityContainers.VersionComponent,
    },
];

@NgModule({
    imports: [AppCommonModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AppCommonRoutingModule {}
