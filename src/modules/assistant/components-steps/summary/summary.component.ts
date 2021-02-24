import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { UtilityService } from '@common/services';
import { ArcElement, Chart, DoughnutController, Legend, LinearScale, Title } from 'chart.js';
// import { getRelativePosition } from 'chart.js/helpers';

Chart.register(ArcElement, DoughnutController, Legend, LinearScale, Title);

@Component({
    selector: 'rdm-summary',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './summary.component.html',
    styleUrls: ['summary.component.scss'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
    @ViewChild('donutChart') donutChart!: ElementRef<HTMLCanvasElement>;
    context!: CanvasRenderingContext2D;
    chart!: Chart;
    constructor(private utilityService: UtilityService) {}
    ngOnInit() {}
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
                        label: 'My First Dataset',
                        data: [4000, 10000],
                        backgroundColor: ['#00acc1', '#4caf50'],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
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
                // scales: {
                //     x: {
                //         type: 'linear',
                //     },
                //     y: {
                //         type: 'linear',
                //     },
                // },
            },
        });
    }
}
