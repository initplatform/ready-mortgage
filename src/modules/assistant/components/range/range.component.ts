import { formatCurrency } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import debounce from 'just-debounce';
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
    @Output() hasValue = new EventEmitter<boolean>();
    @Output() liveValue = new EventEmitter<number>();

    updateValue = debounce((value: number) => {
        this.liveValue.emit(value);
    }, 500);

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
                this.updateValue(value);
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
