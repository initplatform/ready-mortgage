import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { RangeComponent } from '@modules/assistant/components/range/range.component';

@Component({
    selector: 'rdm-known-home-price',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './known-home-price.component.html',
    styleUrls: ['known-home-price.component.scss'],
})
export class KnownHomePriceComponent implements OnInit {
    @ViewChild('homePrice') homePrice!: RangeComponent;
    constructor() {}
    ngOnInit() {}
    currentValue(event: number) {
        console.log(event);
    }
    test() {
        console.log(this.homePrice.currentValue);
    }
}
