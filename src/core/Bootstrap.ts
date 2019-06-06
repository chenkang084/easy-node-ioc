import 'reflect-metadata';
import { statSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { autowired_reg, CONTROL, RESTFUL } from './Constants';
import logger from '../utils/logger';

export const iocContainer = new WeakMap<any, any>();
export const controlSet = new Set();

function recurInject(target: any) {
  // instantiate target
  const targetInstance = new target();
  logger.info(`instantiate ${target.name}`);

  // get the dependance of target
  const depends = Reflect.getOwnMetadataKeys(target).filter(
    (meta: string) => 'design:paramtypes' !== meta
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

    // if (depClass.match(control_reg)) {
    //   controlSet.add(target);
    // }
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
  logger.info('tool start to instantaiate class');

  recurInject(target);

  // instantiate app class
  const expressInstance = iocContainer.get(target);
  const { app } = expressInstance;

  // loop all control class
  for (const control of controlSet) {
    recurInject(control);

    // get control instance
    const controlInstance = iocContainer.get(control);
    // get instance's metas
    const metas = Reflect.getMetadataKeys(controlInstance);

    const restfulMap = Reflect.getMetadata(RESTFUL, controlInstance);
    const controlPath = Reflect.getMetadata(CONTROL, control);

    Object.getOwnPropertyNames(controlInstance.__proto__)
      .filter(name => name !== 'constructor')
      .forEach(methodName => {
        const method = controlInstance[methodName];
        const parameterMap = restfulMap.get(method);
        const methodPath = parameterMap.get('path');
        const querySet = parameterMap.get('query');
        const paramsSet = parameterMap.get('params') as Set<string>;
        const bodySet = parameterMap.get('body') as Set<string>;
        const methodType = parameterMap.get('methodType');
        const args = parameterMap.get('args');

        app[methodType](
          controlPath + methodPath,
          (req: any, res: any, next: any) => {
            const parametersVals = args.map((arg: string) => {
              if (paramsSet && paramsSet.has(arg)) {
                return req.params[arg];
              }
              if (querySet && querySet.has(arg)) {
                return req.query[arg];
              }
              if (bodySet && bodySet.has(arg)) {
                return req.body[arg];
              }
            });

            method.apply(
              controlInstance,
              parametersVals.concat([req, res, next])
            );
          }
        );
      });
  }

  logger.info('easy-ioc tool instantaiate all class completely.');

  expressInstance.main();
}

function loadFile(path: string) {
  const appBootstrapPath = join(process.argv[1], '..');
  let absolutePath = path;

  if (path.indexOf(appBootstrapPath) === -1) {
    absolutePath = join(appBootstrapPath, path);
  }

  const stats = statSync(absolutePath);

  if (stats.isDirectory()) {
    const files = readdirSync(absolutePath);
    for (const file of files) {
      // console.log(join(absolutePath, file));
      loadFile(join(absolutePath, file));
    }
  } else {
    if (absolutePath.match(/.*[^\.]+\b\.js\b$/)) {
      logger.info(`scan file ${absolutePath}`);
      require(absolutePath);
    }
  }
}

export function ComponentScan(scanPath: string) {
  if (scanPath) {
    scanPath.split(',').forEach(path => {
      loadFile(path);
    });
  }

  return (target: any) => {};
}
