import { formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rdm-range',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './range.component.html',
    styleUrls: ['range.component.scss'],
})
export class RangeComponent implements OnInit, OnDestroy {
    @Input() min!: number;
    @Input() max!: number;
    @Input() originalMax!: number;
    @Input() initialValue!: number;
    @Input() step!: number;
    @Input() currency!: boolean;
    @Input() spread!: number;
    @Input() maxValueIsCeiling = true;
    @Input() showPercent = false;

    currentValue!: number;

    subscription: Subscription = new Subscription();
    rangeControl!: FormControl;

    constructor() {}
    ngOnInit() {
        this.rangeControl = new FormControl();
        this.rangeControl.setValue(this.initialValue);
        this.currentValue = this.initialValue;

        this.subscription.add(
            this.rangeControl.valueChanges.subscribe((value: number) => {
                this.currentValue = value;
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
