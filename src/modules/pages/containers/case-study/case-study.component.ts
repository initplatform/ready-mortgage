import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-case-study',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './case-study.component.html',
    styleUrls: ['case-study.component.scss'],
})
export class CaseStudyComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
