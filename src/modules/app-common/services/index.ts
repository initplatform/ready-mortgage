import { LoremIpsumService } from './lorem-ipsum.service';
import { UtilityService } from './utility.service';

export const services = [UtilityService, LoremIpsumService];

export * from './utility.service';
export * from './lorem-ipsum.service';
