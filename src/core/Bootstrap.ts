import 'reflect-metadata';
import {
  autowired_reg,
  control_reg,
  restful_reg,
  CONTROL,
  RestfulMethodType
} from './Constants';
import logger from '../utils/logger';

export const iocContainer = new WeakMap();
export const controlSet = new Set();
// export const restfulMap = new Map<any, any>();

function recurInject(target: any) {
  // instantiate target
  const targetInstance = new target();
  logger.info(`instantiate ${target.name}`);

  // bind runtime this for prototype method
  // Object.getOwnPropertyNames(targetInstance.__proto__)
  //   .filter((prop: string) => prop !== 'constructor')
  //   .forEach((prop: string) => {
  //     const method = targetInstance.__proto__[prop];
  //     targetInstance.__proto__[prop] = method.bind(targetInstance);
  //   });

  // get the dependance of target
  const depends = Reflect.getOwnMetadataKeys(target).filter(
    (meta: string) =>
      // ['design:paramtypes', restful_reg].filter((type: RegExp) =>
      //   meta.match(type)
      // ).length === 0
      'design:paramtypes' !== meta
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

    if (depClass.match(control_reg)) {
      controlSet.add(target);
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

  // console.log(controlSet);

  // instantiate app class
  const expressInstance = iocContainer.get(target);

  // loop all control class
  for (const control of controlSet) {
    // get control instance
    const controlInstance = iocContainer.get(control);
    // get instance's metas
    const metas = Reflect.getMetadataKeys(controlInstance);
    const controlPath = Reflect.getMetadata(CONTROL, control);
    metas
      .filter((meta: string) => meta.match(restful_reg))
      .forEach((restful: string) => {
        const restInfo = restful.split('@@');
        const methodType = restInfo[2];
        const methodPath = restInfo[3];

        const method = Reflect.getMetadata(restful, controlInstance);

        logger.info(`easy-ioc inject controller:${control.name}`);

        expressInstance.app[methodType as RestfulMethodType](
          controlPath + methodPath,
          method.value.bind(controlInstance)
        );
      });
  }

  logger.info('easy-ioc tool instantaiate all class completely.');

  expressInstance.main();
}
