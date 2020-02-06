import 'reflect-metadata';
import { statSync, readdirSync } from 'fs';
import { join } from 'path';
import { autowired_reg, CONTROL, RESTFUL, MIDDLEWARE } from './Constants';
import logger from '../utils/logger';

const env = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) || 'prod';

export const iocContainer = new WeakMap<Function, any>();
export const controlSet = new Set<Function>();
export const serviceSet = new Set<Function>();
export const preHandles: Promise<any>[] = [];

const startTime = Date.now();

export function recurInject(target: any) {
  if (!target) {
    return;
  }

  // instantiate target
  const targetInstance = new target();
  logger.info(`instantiate ${target.name}`);

  // get the dependance of target
  const depends = Reflect.getOwnMetadataKeys(target).filter((meta: string) => 'design:paramtypes' !== meta);

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
      logger.info(`add prop [${prop}]: to ${target.name}`);
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
  (async function run() {
    logger.info('tool start to instantaiate class');

    if (preHandles.length > 0) {
      logger.info('start to execuate preHandle methods');
      for (const promise of preHandles) {
        await promise;
      }
      logger.info('execuate preHandle methods done');
    }

    // instantiate app class
    const expressInstance = recurInject(target);
    const { app } = expressInstance;

    // loop all control class
    for (const control of controlSet) {
      // get control instance
      const controlInstance = iocContainer.get(control);
      // get instance's metas
      const metas = Reflect.getMetadataKeys(controlInstance);

      const restfulMap = Reflect.getMetadata(RESTFUL, controlInstance);
      const controlPath = Reflect.getMetadata(CONTROL, control);

      Object.getOwnPropertyNames(controlInstance.__proto__)
        .filter((name) => name !== 'constructor')
        .forEach((methodName) => {
          const method = controlInstance[methodName];
          const parameterMap = restfulMap.get(method);
          const methodPath = parameterMap.get('path');
          const querySet = parameterMap.get('query');
          const paramsSet = parameterMap.get('params') as Set<string>;
          const bodySet = parameterMap.get('body') as Set<string>;
          const requestBodySet = parameterMap.get('RequestBody') as Set<string>;
          const methodTypeSet = parameterMap.get('methodTypeSet');
          const args = parameterMap.get('args');
          const middleWareSet = parameterMap.get(MIDDLEWARE);

          const handleRequest = async (req: any, res: any, next: any) => {
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

              if (requestBodySet && requestBodySet.has(arg)) {
                return req.body;
              }
            });

            // catch promise error
            try {
              await method.apply(controlInstance, parametersVals.concat([req, res, next]));
            } catch (error) {
              logger.error(error);
              res.status(500).send(error && error.message);
            }
          };

          [...methodTypeSet].forEach((methodType: string) => {
            // has middlewares, apply middlewares
            if (middleWareSet) {
              app[methodType](controlPath + methodPath, Array.from(middleWareSet), handleRequest);
            } else {
              app[methodType](controlPath + methodPath, handleRequest);
            }
          });
        });
    }

    logger.info('instantaiate all class completely.');

    expressInstance.main();

    logger.info(`start application spent ${(Date.now() - startTime) / 1000} s`);
  })();
}

function loadFile(path: string) {
  const stats = statSync(path);

  if (stats.isDirectory()) {
    const files = readdirSync(path);
    for (const file of files) {
      // console.log(join(path, file));
      loadFile(join(path, file));
    }
  } else {
    if (path.match(/.*[^\.]+\b\.(t|j)s\b$/)) {
      logger.info(`scan file ${path}`);
      // excuate file
      require(path);
    }
  }
}

export function ComponentScan(scanPath: string) {
  if (scanPath) {
    scanPath.split(',').forEach((path) => {
      loadFile(path);
    });
  }

  return (target: any) => {};
}
