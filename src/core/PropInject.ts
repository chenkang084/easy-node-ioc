import 'reflect-metadata';
import { AUTOWIRED } from './Constants';

export function Autowired(target: any, propKey: string) {
  const _constructor = Reflect.getMetadata('design:type', target, propKey);
  Reflect.defineMetadata(
    `${AUTOWIRED}@@${propKey}`,
    _constructor,
    target.constructor
  );
}
