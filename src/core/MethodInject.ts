import { RESTFUL } from './Constants';

export function Get(path: string) {
  return function(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(`${RESTFUL}@@get@@${path}`, descriptor, target);
  };
}
