import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-basic-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './basic-page.component.html',
    styleUrls: ['basic-page.component.scss'],
})
export class BasicPageComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
