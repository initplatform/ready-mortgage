import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(
        private navigationService: NavigationService,
        private utilityService: UtilityService
    ) {}
    @Input() topNavClasses = 'fixed-top';
    @Input() brandClasses = 'text-primary';
    @Input() buttonClasses = 'btn-primary';

    isTransparentFixed = false;
    scrolledClassAdded = false;
    isMenuCollapsed = true;

    @HostListener('window:scroll', ['$event'])
    scrollHandler(event: Event) {
        if (!this.isTransparentFixed) {
            return;
        }
        if (this.utilityService.window.scrollY > 0 && !this.scrolledClassAdded) {
            this.scrolledClassAdded = true;
            this.topNavClasses = `${this.topNavClasses} navbar-scrolled`;
            return;
        }
        if (this.utilityService.window.scrollY === 0) {
            this.scrolledClassAdded = false;
            this.topNavClasses = this.topNavClasses.replace(' navbar-scrolled', '');
        }
    }
    ngOnInit() {
        if (this.topNavClasses.match('bg-transparent') && this.topNavClasses.match('fixed-top')) {
            this.isTransparentFixed = true;
        }
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
