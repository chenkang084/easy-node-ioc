import { Bootstrap, Autowired } from '../';
import TestControl from './TestController';
import TestService from './TestService';

@Bootstrap
class MyApp {
  @Autowired
  private testControl: TestControl;
  @Autowired
  private testService: TestService;

  main() {
    console.log('start app');
    this.testControl.testService.query();
    this.testService.query();
  }
}
