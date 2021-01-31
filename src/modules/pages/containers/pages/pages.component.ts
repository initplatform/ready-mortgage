import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-pages',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pages.component.html',
    styleUrls: ['pages.component.scss'],
})
export class PagesComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
