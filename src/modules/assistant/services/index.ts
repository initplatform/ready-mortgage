import { AssistantService } from './assistant.service';
import { IndexedDBService } from './indexed-db.service';

export const services = [AssistantService, IndexedDBService];

export * from './assistant.service';
export * from './indexed-db.service';
