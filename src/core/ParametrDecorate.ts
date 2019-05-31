import { RESTFUL } from './Constants';
import {
  getRestfulMap,
  getRestfulParameterMap,
  getRestfulParameterSet
} from '../utils/common';

export function RequestParam(requestParam: string) {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    // const tmp = Reflect.getMetadata('design:paramtypes', target);
    // const tmp2 = Reflect.getMetadata('design:type', target);
    // const tmp3 = Reflect.getMetadataKeys(target);
    // const tmp4 = Reflect.getOwnMetadataKeys(target);
    // const tmp5 = Reflect.getOwnMetadataKeys(target.constructor);
    // const tmp6 = Reflect.getMetadata('design:type', target.constructor);
    // const tmp7 = Reflect.getMetadata('design:paramtypes', target.constructor);
    // const tmp8 = Reflect.getMetadata('design:paramtypes', target['index']);
    // const tmp9 = Reflect.getMetadata('design:type', target['index']);

    // const t = Reflect.getMetadata('design:type', target, propertyKey);
    // const t2 = Reflect.getMetadata('design:paramtypes', target, propertyKey);

    /**
     * bind RESTFUL to instance
     * key    --> method
     * value  --> Map
     *                key   --> parameters
     *                value --> set
     */

    const restfulMap = getRestfulMap(`${RESTFUL}`, target);
    const method = target[propertyKey];

    const methodMap = getRestfulParameterMap(method, restfulMap);

    const parametersSet = getRestfulParameterSet(methodMap);
    parametersSet.add(requestParam);

    methodMap.set('parameters', parametersSet);

    if (!restfulMap.has(method)) {
      restfulMap.set(method, methodMap);
    }

    // define or overwrite RESTFUL map
    Reflect.defineMetadata(RESTFUL, restfulMap, target);
  };
}
