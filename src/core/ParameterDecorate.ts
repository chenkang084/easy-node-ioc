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

    methodMap.set('query', parametersSet);

    if (!restfulMap.has(method)) {
      restfulMap.set(method, methodMap);
    }

    // define or overwrite RESTFUL map
    Reflect.defineMetadata(RESTFUL, restfulMap, target);
  };
}

export function PathVariable(requestParam: string) {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
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

    methodMap.set('params', parametersSet);

    if (!restfulMap.has(method)) {
      restfulMap.set(method, methodMap);
    }

    // define or overwrite RESTFUL map
    Reflect.defineMetadata(RESTFUL, restfulMap, target);
  };
}
