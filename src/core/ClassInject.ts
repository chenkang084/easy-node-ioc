import { classMap } from './Bootstrap';
import logger from '../utils/logger';

/**
 * add class constructor to classMap
 */

function Injectable() {
  return (target: Function) => {
    const targetName = target.name;
    // TODO class name duplicate
    if (!classMap.has(targetName)) {
      logger.info(`=====inject ${targetName}=====`);
      classMap.set(targetName, target);
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
  return Injectable();
}
