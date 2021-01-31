import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-terms',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './terms.component.html',
    styleUrls: ['terms.component.scss'],
})
export class TermsComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
