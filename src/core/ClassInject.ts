import 'reflect-metadata';
// import { classMap } from './Bootstrap';
import logger from '../utils/logger';
import { CONTROL } from './Constants';
// import { DecoratorType } from './Types';

/**
 * add class constructor to classMap
 */

function Injectable(path?: string) {
  return (target: Function) => {
    const targetName = target.name;
    // TODO class name duplicate
    // use function as key since map save it by function's pointer
    // if (!classMap.has(targetName)) {
    //   logger.info(`=====inject ${targetName}=====`);
    //   classMap.set(targetName, target);
    // }

    if (path) {
      Reflect.defineMetadata(CONTROL, path, target);
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
