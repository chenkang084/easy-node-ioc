import { RESTFUL, RestfulMethodType } from './Constants';
import {
  getRestfulMap,
  getRestfulParameterMap,
  getFunctionParams
} from '../utils/common';

export function Get(path: string) {
  handleRequest('get', path);
}
export function Post(path: string) {
  handleRequest('post', path);
}

export function Put(path: string) {
  handleRequest('put', path);
}

export function Delete(path: string) {
  handleRequest('delete', path);
}

export function Patch(path: string) {
  handleRequest('patch', path);
}

function handleRequest(reqType: RestfulMethodType, path: string) {
  return function(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    /**
     * bind RESTFUL to instance
     * key    --> method
     * value  --> Map
     *                key   --> path
     *                value --> string
     */

    const restfulMap = getRestfulMap(`${RESTFUL}`, target);
    const method = target[propertyKey];

    const methodMap = getRestfulParameterMap(method, restfulMap);

    methodMap.set('path', path);
    methodMap.set('methodType', 'get');
    methodMap.set(
      'args',
      getFunctionParams(method).filter(
        arg => !['req', 'res', 'next'].includes(arg)
      )
    );

    if (!restfulMap.has(method)) {
      restfulMap.set(method, methodMap);
    }

    // define or overwrite RESTFUL map
    Reflect.defineMetadata(RESTFUL, restfulMap, target);
  };
}
