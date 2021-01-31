import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sbpro-archive',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './archive.component.html',
    styleUrls: ['archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
