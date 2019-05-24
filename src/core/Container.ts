import 'reflect-metadata';
import { autowired_reg } from './Constants';

export const containers = new WeakMap();
export const classPool = new Map<String, any>();

export function instanceClass<T>(_constructor: {
  new (...args: Array<any>): T;
}): T {
  // Has been instantiated
  if (containers.has(_constructor)) {
    return containers.get(_constructor);
  }

  // get the parameters of construct
  const paramsTypes: Array<Function> = Reflect.getMetadata(
    'design:paramtypes',
    _constructor
  );

  // instantiate dependance
  const paramInstances =
    paramsTypes &&
    paramsTypes.map(dependConstruct => {
      // if construct has parameters , recur
      if (dependConstruct.length) {
        return instanceClass(dependConstruct as any);
      } else {
        if (containers.has(dependConstruct)) {
          return containers.get(dependConstruct);
        } else {
          const instance = new (dependConstruct as any)();
          containers.set(dependConstruct, instance);
          return instance;
        }
      }
    });

  const instance = new _constructor(...paramInstances);
  containers.set(_constructor, instance);
  return instance;
}

// export class Bootstrap {
//   main() {
//     // loop all has been injected class
//     for (const item of classPool.values()) {
//       const depends = Reflect.getOwnMetadataKeys(item).filter(
//         (meta: string) => meta !== 'design:paramtypes'
//       );
//       depends &&
//         depends.forEach((meta: string) => {
//           if (meta.match(autowired_reg)) {
//             const _constructor = Reflect.getMetadata(meta, item);
//             containers.set(_constructor, new _constructor());
//           }
//         });
//     }
//   }
// }

export class App {
  main() {}
}

export function Bootstrap(target: any) {
  // loop all has been injected class
  for (const item of classPool.values()) {
    // get dependence and instantiate
    const depends = Reflect.getOwnMetadataKeys(item).filter(
      (meta: string) => meta !== 'design:paramtypes'
    );
    depends &&
      depends.forEach((meta: string) => {
        if (meta.match(autowired_reg)) {
          const _constructor = Reflect.getMetadata(meta, item);
          if (!containers.has(_constructor)) {
            // instantiate dependence
            containers.set(_constructor, new _constructor());
          }
        }
      });

    if (!containers.has(item)) {
      // instantiate class
      containers.set(item, new item());
    }
  }

  const app = new target();

  const appDepends = Reflect.getOwnMetadataKeys(target).filter(
    (meta: string) => meta !== 'design:paramtypes'
  );

  appDepends.forEach((dep: string) => {
    const _constructor = Reflect.getMetadata(dep, target);
    const prop = dep.replace(autowired_reg, '');
    app[prop] = new _constructor();
  });

  // // new target();

  app.main();

  // console.log();
}
