import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilityService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sbpro-lead-capture',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './lead-capture.component.html',
    styleUrls: ['lead-capture.component.scss'],
})
export class LeadCaptureComponent implements OnInit, AfterViewInit {
    @ViewChild('confirmationModal') confirmationModal!: TemplateRef<unknown>;

    signupForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        company: ['', [Validators.required]],
    });

    constructor(
        private utilityService: UtilityService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.utilityService.AOS.init({
            disable: 'mobile',
            duration: 600,
            once: true,
        });
    }

    onSubmit() {
        if (this.signupForm.status === 'VALID') {
            this.modalService.open(this.confirmationModal).result.then(
                result => {},
                reason => {}
            );
        }

        for (const key in this.signupForm.controls) {
            const control = this.signupForm.controls[key];
            control.markAllAsTouched();
        }
    }

    // Accessors

    get emailControl() {
        return this.signupForm.get('email') as FormControl;
    }

    get emailControlValid() {
        return this.emailControl.touched && !this.emailControlInvalid;
    }

    get emailControlInvalid() {
        return (
            this.emailControl.touched &&
            (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
        );
    }

    get firstNameControl() {
        return this.signupForm.get('firstName') as FormControl;
    }

    get firstNameControlValid() {
        return this.firstNameControl.touched && !this.firstNameControlInvalid;
    }

    get firstNameControlInvalid() {
        return this.firstNameControl.touched && this.firstNameControl.hasError('required');
    }

    get lastNameControl() {
        return this.signupForm.get('lastName') as FormControl;
    }

    get lastNameControlValid() {
        return this.lastNameControl.touched && !this.lastNameControlInvalid;
    }

    get lastNameControlInvalid() {
        return this.lastNameControl.touched && this.lastNameControl.hasError('required');
    }

    get companyControl() {
        return this.signupForm.get('company') as FormControl;
    }

    get companyControlValid() {
        return this.companyControl.touched && !this.companyControlInvalid;
    }

    get companyControlInvalid() {
        return this.companyControl.touched && this.companyControl.hasError('required');
    }
}
