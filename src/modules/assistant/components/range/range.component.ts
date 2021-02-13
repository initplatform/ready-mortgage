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
    @Input() initialValue!: number;
    @Input() step!: number;
    // @Output() currentValue = new EventEmitter<number>();

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
                // this.currentValue.emit(value);
                this.currentValue = value;
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
