import { Bootstrap } from '../core/Bootstrap';
import { Autowired } from '../core/PropInject';
import TestControl from './TestController';

@Bootstrap
class MyApp {
  @Autowired
  testControl: TestControl;

  main() {
    console.log('start app');
    this.testControl.testService.query();
  }
}
