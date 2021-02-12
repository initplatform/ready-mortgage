import { AssistantGuard } from './assistant.guard';
import { ErrorGuard } from './error.guard';

export const guards = [ErrorGuard, AssistantGuard];

export * from './assistant.guard';
export * from './error.guard';
