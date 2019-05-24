import 'reflect-metadata';
import { autowired_reg } from './Constants';
import logger from '../utils/logger';

export const iocContainer = new WeakMap();
export const classMap = new Map<any, any>();

/**
 * loop classMap and instantiate class
 * if class has dependences , instantiate dependence firstly
 * @param target
 */
export function Bootstrap(target: any) {
  logger.info('easy-ioc: tool start to instantaiate class');

  const classInterator = classMap.values();
  // loop classMap
  for (const $$class of classInterator) {
    // get the dependence of class and instantiate
    const classDepends = Reflect.getOwnMetadataKeys($$class).filter(
      (meta: string) => meta !== 'design:paramtypes'
    );

    // get instance of class from iocContainer
    let classInstance = iocContainer.get($$class);

    if (!iocContainer.has($$class)) {
      // instantiate class
      classInstance = new $$class();
      logger.info(`easy-ioc: instantiate ${$$class.name}`);
      iocContainer.set($$class, classInstance);
    }

    classDepends &&
      classDepends.forEach((depClass: string) => {
        if (depClass.match(autowired_reg)) {
          const _constructor = Reflect.getMetadata(depClass, $$class);
          const prop = depClass.replace(autowired_reg, '');
          let depInstance = iocContainer.get(_constructor);
          if (!iocContainer.has(_constructor)) {
            // instantiate dependence
            depInstance = new _constructor();
            logger.info(`easy-ioc: instantiate ${_constructor.name}`);
            iocContainer.set(_constructor, depInstance);
          }

          classInstance[prop] = depInstance;
        }
      });
  }

  // instantiate app class
  const app = new target();
  logger.info(`easy-ioc: instantiate ${target.name}`);

  // get app's dependence
  const appDepends = Reflect.getOwnMetadataKeys(target).filter(
    (meta: string) => meta !== 'design:paramtypes'
  );

  appDepends.forEach((appDep: string) => {
    const depClass = Reflect.getMetadata(appDep, target);
    const prop = appDep.replace(autowired_reg, '');

    let depInstance = iocContainer.get(depClass);

    if (!iocContainer.has(depClass)) {
      depInstance = new depClass();
      logger.info(`easy-ioc: instantiate ${depClass.name}`);
    }
    app[prop] = depInstance;
  });

  logger.info('easy-ioc: tool instantaiate all class completely.');

  app.main();
}
