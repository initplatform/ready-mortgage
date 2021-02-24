import { CreditScoreComponent } from './credit-score/credit-score.component';
import { DebtComponent } from './debt/debt.component';
import { DownPaymentComponent } from './down-payment/down-payment.component';
import { IncomeComponent } from './income/income.component';
import { KnownHomePriceComponent } from './known-home-price/known-home-price.component';
import { PurchaseStageComponent } from './purchase-stage/purchase-stage.component';
import { RemainingMortgageComponent } from './remaining-mortgage/remaining-mortgage.component';
import { SummaryComponent } from './summary/summary.component';

export const componentsSteps = [PurchaseStageComponent, RemainingMortgageComponent, KnownHomePriceComponent, DownPaymentComponent, CreditScoreComponent, IncomeComponent, DebtComponent, SummaryComponent];

export * from './purchase-stage/purchase-stage.component';
export * from './remaining-mortgage/remaining-mortgage.component';
export * from './known-home-price/known-home-price.component';
export * from './down-payment/down-payment.component';
export * from './credit-score/credit-score.component';
export * from './income/income.component';
export * from './debt/debt.component';
export * from './summary/summary.component';
