import { CopyToClipboardOptions } from '@common/models';
import { UtilityService } from '@common/services';
import AOS, { Aos } from 'aos';
import { of } from 'rxjs';

export class UtilityServiceStub implements Partial<UtilityService> {
    get window() {
        return this._window;
    }
    _window = window;
    version$ = of('VERSION');
    AOS = {
        init: () => {},
    } as Aos;
    getStoredObject = <T>(objectName: string) => undefined;
    storeObject = (objectName: string, objectToStore: {}) => {};
    copyToClipboard = (text: string, options?: CopyToClipboardOptions) => {};
}
