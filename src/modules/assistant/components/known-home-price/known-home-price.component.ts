import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'rdm-known-home-price',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './known-home-price.component.html',
    styleUrls: ['known-home-price.component.scss'],
})
export class KnownHomePriceComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
