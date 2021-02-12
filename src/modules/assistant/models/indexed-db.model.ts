import { Assistant } from '@modules/assistant/models';
import { DBSchema } from 'idb';

export interface ReadyMortgageDB extends DBSchema {
    assistant: {
        value: Assistant;
        key: string;
        indexes: { id: UUID };
    };
}
