import { Controller } from './Controller';
import { Service } from './Service';
import { Bootstrap, classPool, containers } from './Container';
import { AUTOWIRED, autowired_reg } from './Constants';
import { Get } from './Methods';
import 'reflect-metadata';

function Autowired(target: any, propKey: string) {
  const _constructor = Reflect.getMetadata('design:type', target, propKey);
  Reflect.defineMetadata(
    `${AUTOWIRED}:${propKey}`,
    _constructor,
    target.constructor
  );
  // console.log();
}

@Service()
class TestService {
  constructor() {
    console.log('service');
  }
  query() {
    console.log('execuate query');
  }
}

@Controller('/test')
class TestControl {
  @Autowired
  testService: TestService;

  constructor(test: string) {
    console.log('TestControl');
    // this.service.query();
  }

  @Get('/test')
  indexPage(test: string) {
    this.testService.query();
  }
}

// const metas = Reflect.getOwnMetadataKeys(TestControl);
// // const t2 = Reflect.getMetadata('custom:annotation', TestControl);
// // const t3 = Reflect.getMetadata('design:paramtypes', TestControl);
// // const t4 = Reflect.getMetadata('design:type', TestControl);
// // const t5 = Reflect.getMetadata('design:annotation', TestControl);
// // const t6 = Reflect.getMetadata('design:returntype', TestControl);

// metas.forEach((meta: string) => {
//   if (meta.match(/^@@autowired/)) {
//     const _constructor = Reflect.getOwnMetadata(meta, TestControl);
//     console.log();
//   }
// });

@Bootstrap
class MyApp {
  @Autowired
  testService: TestService;

  constructor() {}

  main() {
    console.log('start app');
    this.testService.query();
  }
}
