import 'reflect-metadata';
import { autowired_reg } from './Constants';
import logger from '../utils/logger';

export const iocContainer = new WeakMap();
// export const iocContainer = new Map();
export const classMap = new Map<any, any>();

function recurInject(target: any) {
  // instantiate target
  const targetInstance = new target();
  logger.info(`instantiate ${target.name}`);

  // bind runtime this for prototype method
  Object.getOwnPropertyNames(targetInstance.__proto__)
    .filter((prop: string) => prop !== 'constructor')
    .forEach((prop: string) => {
      const method = targetInstance.__proto__[prop];
      targetInstance.__proto__[prop] = method.bind(targetInstance);
    });

  // get the dependance of target
  const depends = Reflect.getOwnMetadataKeys(target).filter(
    (meta: string) => meta !== 'design:paramtypes'
  );

  // iterator dependance
  depends.forEach((depClass: string) => {
    // get @@AUTOWIRED
    if (depClass.match(autowired_reg)) {
      // get constructor of dependance
      const _constructor = Reflect.getMetadata(depClass, target);
      // get depenance's name
      const prop = depClass.replace(autowired_reg, '');
      // check if has been instantiated in iocContainer
      let depInstance = iocContainer.get(_constructor);
      if (!iocContainer.has(_constructor)) {
        // has not been instantiated , new dependance via recurring
        depInstance = recurInject(_constructor);
      }

      // add dependance's instance to target
      targetInstance[prop] = depInstance;
      logger.info(` add prop [${prop}]: to ${target.name}`);
    }
  });

  // inject instance to container
  iocContainer.set(target, targetInstance);

  return targetInstance;
}

/**
 * loop classMap and instantiate class
 * if class has dependences , instantiate dependence firstly
 * @param target
 */
export function Bootstrap(target: any) {
  logger.info(' tool start to instantaiate class');

  recurInject(target);

  // instantiate app class
  const app = iocContainer.get(target);

  logger.info(' tool instantaiate all class completely.');

  app.main();
}

