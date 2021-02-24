import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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

    constructor(@Inject(DOCUMENT) private _document: Document, private http: HttpClient) {
        this._window = window;
        this.parse = JSON.parse;
        this.stringify = JSON.stringify;
        this.localStorage = localStorage;
        this._copyToClipboard = copyToClipboard;
        this._AOS = AOS;
        this._lity = lity;
    }

    get document(): Document {
        return this._document;
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

    // Only works with Bootstrap 5
    // get primary(): string {
    //     return getComputedStyle(this._document.documentElement)
    //         .getPropertyValue('--bs-primary')
    //         .trim();
    // }

    // get primaryRGB(): string {
    //     const rgb = this._hexToRgb(this.primary);
    //     if (!rgb) {
    //         throw new Error(`UNABLE_TO_CONVERT_STRING_TO_RGB: ${rgb}`);
    //     }
    //     return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    // }

    // get secondary(): string {
    //     return getComputedStyle(this._document.documentElement)
    //         .getPropertyValue('--bs-secondary')
    //         .trim();
    // }

    // get secondaryRGB(): string {
    //     const rgb = this._hexToRgb(this.secondary);
    //     if (!rgb) {
    //         throw new Error(`UNABLE_TO_CONVERT_STRING_TO_RGB: ${rgb}`);
    //     }
    //     return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    // }

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

    _hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }
}
