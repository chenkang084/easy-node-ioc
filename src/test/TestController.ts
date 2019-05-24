import { Controller } from '../core/ClassInject';
import { Autowired } from '../core/PropInject';
import TestService from './TestService';

@Controller('/test')
export default class TestControl {
  @Autowired
  testService: TestService;

  constructor(test: string) {
    console.log('TestControl');
    // this.service.query();
  }

  //   @Get('/test')
  indexPage(test: string) {
    this.testService.query();
  }
}
