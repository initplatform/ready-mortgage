export interface CopyToClipboardOptions {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
}
export type CopyToClipboard = (text: string, options?: CopyToClipboardOptions) => boolean;

export type BorderType = 'angled' | 'rounded' | 'waves';

export interface FAQ {
    question: string;
    answer: string;
}
