import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from '@common/services';
import {
    Assistant,
    DebtSource,
    DebtSourceDynamicControl,
    DebtSourceForm,
    DebtSourceName,
    debtSourceNames,
} from '@modules/assistant/models';
import { JourneyService } from '@modules/assistant/services';
import { assistantActions, assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import debounce from 'just-debounce';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'rdm-debt',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './debt.component.html',
    styleUrls: ['debt.component.scss'],
})
export class DebtComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    assistant!: Assistant;
    totalDebt!: number;
    debtSourceNames = debtSourceNames;
    debtForm = this.fb.group({
        debtSources: new FormArray([]),
    });

    dispatch = debounce((debtSources: DebtSource[]) => {
        this.store.dispatch(
            assistantActions.setDebtSources({
                debtSources,
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
                if (this.assistant.buyer.debtSources.length > 0) {
                    this.assistant.buyer.debtSources.reduceRight<null>((_, debtSource) => {
                        this.addDebtSource(debtSource.name, debtSource.dynamicControl);
                        return null;
                    }, null);
                    this._setTotalDebt(this.assistant.buyer.debtSources);
                }
            });

        this.subscription.add(
            this.debtForm.valueChanges.subscribe((value: DebtSourceForm) => {
                // Calculate total total
                this._setTotalDebt(value.debtSources);
                this.dispatch(value.debtSources);
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    _setTotalDebt(debtSources: DebtSource[]) {
        this.totalDebt = debtSources.reduce<number>((previous, current) => {
            return previous + current.dynamicControl.total;
        }, 0);
    }
    removeDebtSource(index: number) {
        this.debtSources.removeAt(index);
    }
    addDebtSource(debtSource: DebtSourceName, dynamicControl?: DebtSourceDynamicControl) {
        if (!dynamicControl) {
            dynamicControl = { total: 0, incomeToDebtTotal: 0 };
        }
        this.debtSources.insert(
            0,
            this.fb.group({
                name: [debtSource, Validators.required],
                dynamicControl: [dynamicControl, []],
            })
        );
    }

    get debtSources() {
        return this.debtForm.get('debtSources') as FormArray;
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
