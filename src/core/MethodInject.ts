import { RESTFUL, RestfulMethodType, MIDDLEWARE } from './Constants';
import {
  getRestfulMap,
  getRestfulParameterMap,
  getFunctionParams
} from '../utils/common';
import multer from 'multer';

const upload = multer();

export function Get(path: string) {
  return handleRequest('get', path);
}
export function Post(path: string) {
  return handleRequest('post', path);
}

export function Put(path: string) {
  return handleRequest('put', path);
}

export function Delete(path: string) {
  return handleRequest('delete', path);
}

export function Patch(path: string) {
  return handleRequest('patch', path);
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
    methodMap.set('methodType', reqType);
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

export function Multer(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const restfulMap = getRestfulMap(`${RESTFUL}`, target);
  const method = target[propertyKey];

  const methodMap = getRestfulParameterMap(method, restfulMap);

  let middleWareSet = methodMap.get(MIDDLEWARE) as Set<any>;

  if (!middleWareSet) {
    middleWareSet = new Set();
  }

  middleWareSet.add(upload.any());
  methodMap.set(MIDDLEWARE, middleWareSet);

  if (!restfulMap.has(method)) {
    restfulMap.set(method, methodMap);
  }

  Reflect.defineMetadata(RESTFUL, restfulMap, target);
}
