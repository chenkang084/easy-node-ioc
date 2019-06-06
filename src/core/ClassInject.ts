import 'reflect-metadata';
// import { classMap } from './Bootstrap';
import logger from '../utils/logger';
import { CONTROL } from './Constants';
import { controlSet } from '..';

/**
 * add class constructor to classMap
 */

function Injectable(path?: string) {
  return (target: Function | any) => {
    const targetName = target.name;
    // TODO class name duplicate
    // use function as key since map save it by function's pointer
    // if (!classMap.has(targetName)) {
    //   logger.info(`=====inject ${targetName}=====`);
    //   classMap.set(targetName, target);
    // }

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
