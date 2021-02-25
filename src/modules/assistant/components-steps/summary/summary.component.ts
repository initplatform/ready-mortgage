import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { UtilityService } from '@common/services';
import { Assistant } from '@modules/assistant/models';
import { assistantSelectors } from '@modules/assistant/store';
import { Store } from '@ngrx/store';
import {
    ArcElement,
    Chart,
    DoughnutController,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
// import { getRelativePosition } from 'chart.js/helpers';

Chart.register(ArcElement, DoughnutController, Legend, LinearScale, Title, Tooltip);

@Component({
    selector: 'rdm-summary',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './summary.component.html',
    styleUrls: ['summary.component.scss'],
})
export class SummaryComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('donutChart') donutChart!: ElementRef<HTMLCanvasElement>;

    subscription: Subscription = new Subscription();

    assistant!: Assistant;
    totalMonthlyIncome!: number;
    adjustedMonthlyIncome!: number;
    totalMonthlyDebt!: number;

    debtToIncomeRatio!: number;

    context!: CanvasRenderingContext2D;
    chart!: Chart;
    constructor(private store: Store, private utilityService: UtilityService) {}
    ngOnInit() {
        this.store
            .select(assistantSelectors.selectAssistant)
            .pipe(take(1))
            .subscribe((assistant) => {
                this.assistant = assistant;
                if (this.assistant.buyer.incomeSources.length > 0) {
                    this.adjustedMonthlyIncome = Math.floor(
                        this.assistant.buyer.incomeSources.reduce<number>((previous, current) => {
                            return previous + current.dynamicControl.debtToIncomeTotal;
                        }, 0) / 12
                    );
                    this.totalMonthlyIncome = Math.floor(
                        this.assistant.buyer.incomeSources.reduce<number>((previous, current) => {
                            return previous + current.dynamicControl.total;
                        }, 0) / 12
                    );
                } else {
                    this.totalMonthlyIncome = 0;
                    this.adjustedMonthlyIncome = 0;
                }
                if (this.assistant.buyer.debtSources.length > 0) {
                    this.totalMonthlyDebt = Math.floor(
                        this.assistant.buyer.debtSources.reduce<number>((previous, current) => {
                            return previous + current.dynamicControl.incomeToDebtTotal;
                        }, 0)
                    );
                } else {
                    this.totalMonthlyDebt = 0;
                }
                this.debtToIncomeRatio = this.totalMonthlyDebt / this.adjustedMonthlyIncome;
                if (this.chart) {
                    this.chart.data.datasets[0].data = [
                        this.totalMonthlyDebt,
                        this.adjustedMonthlyIncome,
                    ];
                }
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngAfterViewInit() {
        const context = this.donutChart.nativeElement.getContext('2d');
        if (!context) {
            throw new Error('UNABLE_TO_GET_CONTEXT');
        }
        this.context = context;
        this.chart = new Chart(this.context, {
            type: 'doughnut',
            data: {
                labels: ['Debt', 'Income'],
                datasets: [
                    {
                        label: 'Debt to Income',
                        data: [this.totalMonthlyDebt || 0, this.adjustedMonthlyIncome || 0],
                        backgroundColor: ['#00acc1', '#4caf50'],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                layout: {
                    padding: {
                        bottom: 10,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Debt to Income',
                    },
                },
                onClick: (event) => {
                    // const canvasPosition = getRelativePosition((event as unknown as MouseEvent), this.chart);

                    const points = this.chart.getElementsAtEventForMode(
                        (event as unknown) as MouseEvent,
                        'nearest',
                        { intersect: true },
                        true
                    );

                    if (points.length) {
                        const firstPoint = points[0];
                        const label = this.chart.data.labels[firstPoint.index];
                        const value = this.chart.data.datasets[firstPoint.datasetIndex].data[
                            firstPoint.index
                        ];
                        console.log(label);
                        console.log(value);
                    }
                },
            },
        });
    }
}
