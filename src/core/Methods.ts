import 'reflect-metadata';

export function Get(path: string) {
  return decoratorRoutes('get', path);
}

export type requestType = 'get' | 'post' | 'put' | 'delete' | 'patch';
function decoratorRoutes(
  requestType: requestType,
  requstPath: string
): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const middlewares = originalMethod.middlewares || undefined;

    descriptor.value = originalMethod;

    // bind path,middle,request path to route
    descriptor.value.routeProperties = {
      requestType,
      middlewares,
      requstPath: requstPath ? requstPath : ''
    };

    const t3 = Reflect.getMetadata(
      'design:returntype',
      target.constructor,
      propertyKey
    );
    const t2 = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    console.log();

    return descriptor;
  };
}
