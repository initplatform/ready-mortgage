import { Injectable } from '@angular/core';
import { Assistant, ReadyMortgageDB } from '@modules/assistant/models';
import { IDBPDatabase, openDB } from 'idb';
import 'indexeddb-getall-shim';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const DB_VERSION = 1;

const _inited$ = new BehaviorSubject<boolean>(false);
const _writing$ = new BehaviorSubject<number>(0);

function writer() {
    return (target: IndexedDBService, propertyKey: string, descriptor: PropertyDescriptor) => {
        // console.log(target, propertyKey, descriptor);
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            _writing$.next(_writing$.value + 1);
            const result = await originalMethod.apply(this, args);
            _writing$.next(_writing$.value - 1);
            return result;
        };
    };
}

@Injectable()
export class IndexedDBService {
    db!: IDBPDatabase<ReadyMortgageDB>;

    private _assistant$ = new ReplaySubject<Assistant>(1);

    constructor() {
        this._init();
    }

    async _init() {
        console.log('### INFO: Initializing IndexedDB');
        this.db = await openDB<ReadyMortgageDB>('builder-db', DB_VERSION, {
            upgrade(db) {
                const assistantStore = db.createObjectStore('assistant', {
                    keyPath: 'id',
                });
                assistantStore.createIndex('id', 'id');
            },
            blocked() {
                console.log('blocked');
            },
            blocking() {
                console.log('blocking');
            },
            terminated() {
                console.log('terminated');
            },
        });
        this.db.onerror = (event) => console.error(event);

        this._assistant$.next(await this.getAssistant());

        _inited$.next(true);
    }

    get inited$() {
        return _inited$;
    }
    get writing$() {
        return _writing$;
    }

    get assistant$() {
        return this._assistant$.asObservable();
    }

    // Assistant
    @writer()
    async putAssistant(value: Assistant): Promise<Assistant> {
        await this.db.put('assistant', value);
        const updatedAssistant = await this.getAssistant();
        this._assistant$.next(updatedAssistant);
        return updatedAssistant;
    }
    // Assumes only 1 assistant in store
    async getAssistant(): Promise<Assistant> {
        const foundAssistant = await this.db.getAll('assistant');
        if (foundAssistant.length > 1) {
            console.log(`### WARN: found more than 1 assistant in indexeddb`);
        }
        if (foundAssistant.length === 0) {
            return this.putAssistant(new Assistant());
        }
        return foundAssistant[0];
    }
    async getAssistantByID(id: UUID): Promise<Assistant> {
        const foundAssistant = await this.db.get('assistant', id);
        if (!foundAssistant) {
            throw new Error(`PROJECT_NOT_FOUND: ${id}}`);
        }
        return foundAssistant;
    }

    @writer()
    async clearAssistant(): Promise<void> {
        await this.db.clear('assistant');
    }

    async resetDB(): Promise<void> {
        console.log('### INFO: Resetting IndexedDB');
        await this.clearAssistant();
    }
}
