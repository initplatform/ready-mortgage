import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from '@common/services';
import {
    Assistant,
    IncomeSource,
    IncomeSourceDynamicControl,
    IncomeSourceForm,
    IncomeSourceName,
    incomeSourceNames,
} from '@modules/assistant/models';
import { JourneyService } from '@modules/assistant/services';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import debounce from 'just-debounce';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'rdm-income',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './income.component.html',
    styleUrls: ['income.component.scss'],
})
export class IncomeComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    assistant!: Assistant;
    totalIncome!: number;
    incomeSourceNames = incomeSourceNames;
    incomeForm = this.fb.group({
        incomeSources: new FormArray([]),
    });

    dispatch = debounce((incomeSources: IncomeSource[]) => {
        this.store.dispatch(
            assistantActions.setIncomeSources({
                incomeSources,
                nextStep: false,
            })
        );
    }, 500);
    constructor(
        private store: Store,
        private fb: FormBuilder,
        private journeyService: JourneyService,
        private utilityService: UtilityService
    ) {}

    ngOnInit() {
        this.store
            .select(assistantSelectors.selectAssistant)
            .pipe(take(1))
            .subscribe((assistant) => {
                this.assistant = assistant;
                if (this.assistant.buyer.incomeSources.length > 0) {
                    this.assistant.buyer.incomeSources.reduceRight<null>((_, incomeSource) => {
                        this.addIncomeSource(incomeSource.name, incomeSource.dynamicControl);
                        return null;
                    }, null);
                    this._setTotalIncome(this.assistant.buyer.incomeSources);
                }
            });

        this.subscription.add(
            this.incomeForm.valueChanges.subscribe((value: IncomeSourceForm) => {
                // Calculate total total
                this._setTotalIncome(value.incomeSources);
                this.dispatch(value.incomeSources);
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    _setTotalIncome(incomeSources: IncomeSource[]) {
        this.totalIncome = incomeSources.reduce<number>((previous, current) => {
            return previous + current.dynamicControl.total;
        }, 0);
    }
    removeIncomeSource(index: number) {
        this.incomeSources.removeAt(index);
    }
    addIncomeSource(incomeSource: IncomeSourceName, dynamicControl?: IncomeSourceDynamicControl) {
        if (!dynamicControl) {
            dynamicControl = { total: 0, debtToIncomeTotal: 0 };
        }
        this.incomeSources.insert(
            0,
            this.fb.group({
                name: [incomeSource, Validators.required],
                dynamicControl: [dynamicControl, []],
            })
        );
    }

    get incomeSources() {
        return this.incomeForm.get('incomeSources') as FormArray;
    }

    continue() {
        this.journeyService.goToNextStep(this.assistant);
    }
    collapseAll() {
        const cardHeaders = this.utilityService.document.querySelectorAll(
            '#dynamicForm a.card-header'
        );
        cardHeaders.forEach((header) => {
            if (!(header as HTMLElement).classList.contains('collapsed')) {
                (header as HTMLElement).click();
            }
        });
    }
}
