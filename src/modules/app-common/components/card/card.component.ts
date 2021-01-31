import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CardBase } from '@common/classes';

@Component({
    selector: 'sbpro-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card.component.html',
    styleUrls: ['card.component.scss'],
})
export class CardComponent extends CardBase implements OnInit {
    @Input() headerActions!: boolean;
    @Input() scrollable = false;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.headerActions) {
            this.cardClasses.push('sb-card-header-actions');
        }
        if (this.scrollable) {
            this.cardClasses.push('sb-card-scrollable');
        }
    }
}
