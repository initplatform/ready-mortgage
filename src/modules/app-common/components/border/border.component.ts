import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BorderType } from '@common/models';

@Component({
    selector: 'sbpro-border',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './border.component.html',
    styleUrls: ['border.component.scss'],
})
export class BorderComponent implements OnInit {
    @Input() borderType!: BorderType;
    @Input() borderClasses!: string;
    constructor() {}
    ngOnInit() {}
}
