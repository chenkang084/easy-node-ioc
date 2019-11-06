import 'reflect-metadata';
import { CONTROL } from './Constants';
import { controlSet } from '..';

/**
 * add class constructor to classMap
 */

function Injectable(path?: string) {
  return (target: Function | any) => {
    // const targetName = target.name;

    if (path) {
      Reflect.defineMetadata(CONTROL, path, target);

      if (!controlSet.has(target)) {
        controlSet.add(target);
      }
    }
  };
}

export function Component() {
  return Injectable();
}

export function Service() {
  return Injectable();
}

export function Controller(path: string) {
  return Injectable(path);
}
