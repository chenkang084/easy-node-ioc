import 'reflect-metadata';
import { CONTROL } from './Constants';
import { controlSet, serviceSet } from '..';
import { recurInject } from './Bootstrap';

/**
 * add class constructor to classMap
 */

// function Injectable(path?: string) {}

// export function Component() {
//   return Injectable();
// }

export const Service = (target: Function | any) => {
  if (!serviceSet.has(target)) {
    recurInject(target);
    serviceSet.add(target);
  }
};

export function Controller(path: string) {
  return (target: Function | any) => {
    // const targetName = target.name;

    if (path) {
      Reflect.defineMetadata(CONTROL, path, target);

      if (!controlSet.has(target)) {
        recurInject(target);
        controlSet.add(target);
      }
    } else {
      throw new Error(`Controller can't omit the path field.`);
    }
  };
}
