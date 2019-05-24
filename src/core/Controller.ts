import Injectable from './Injectable';
import { DecoratorType } from './Types';

export function Controller(path: string) {
  return Injectable(DecoratorType.Controller);
}

export function Get() {}
