import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyToClipboard, CopyToClipboardOptions } from '@common/models';
import AOS, { Aos } from 'aos';
import copyToClipboard from 'copy-to-clipboard';
import lity, { Lity } from 'lity';
import { Observable } from 'rxjs';

@Injectable()
export class UtilityService {
    _window: Window;
    parse: JSON['parse'];
    stringify: JSON['stringify'];
    localStorage: Storage;
    _copyToClipboard: CopyToClipboard;
    _AOS: Aos;
    _lity: Lity;

    constructor(private http: HttpClient) {
        this._window = window;
        this.parse = JSON.parse;
        this.stringify = JSON.stringify;
        this.localStorage = localStorage;
        this._copyToClipboard = copyToClipboard;
        this._AOS = AOS;
        this._lity = lity;
    }

    get window(): Window {
        return this._window;
    }
    get version$(): Observable<string> {
        return this.http.get('/assets/version', { responseType: 'text' });
    }
    get AOS(): Aos {
        return this._AOS;
    }

    getStoredObject<T>(objectName: string): T | undefined {
        const objectString = this.localStorage.getItem(objectName);
        if (!objectString) {
            return undefined;
        }
        return this.parse(objectString) as T;
    }

    storeObject(objectName: string, objectToStore: {}): void {
        this.localStorage.setItem(objectName, this.stringify(objectToStore));
    }

    copyToClipboard(text: string, options?: CopyToClipboardOptions) {
        this._copyToClipboard(text, options);
    }
}
