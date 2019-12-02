import { RESTFUL } from './Constants';
import { getRestfulMap, getRestfulParameterMap, getRestfulParameterSet } from '../utils/common';

function CheckAndSetParameters(paramterName: string, parameterType: string) {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
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

    const parametersSet = getRestfulParameterSet(methodMap, parameterType);
    parametersSet.add(paramterName);

    methodMap.set(parameterType, parametersSet);

    if (!restfulMap.has(method)) {
      restfulMap.set(method, methodMap);
    }

    // define or overwrite RESTFUL map
    Reflect.defineMetadata(RESTFUL, restfulMap, target);
  };
}

export function RequestParam(paramterName: string) {
  return CheckAndSetParameters(paramterName, 'query');
}

export function PathVariable(paramterName: string) {
  return CheckAndSetParameters(paramterName, 'params');
}

export function Body(paramterName: string) {
  return CheckAndSetParameters(paramterName, 'body');
}

export function RequestBody(paramterName: string) {
  return CheckAndSetParameters(paramterName, 'RequestBody');
}
