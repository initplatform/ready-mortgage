import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-masonry',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './masonry.component.html',
    styleUrls: ['masonry.component.scss'],
})
export class MasonryComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
