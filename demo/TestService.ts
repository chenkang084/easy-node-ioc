import { Service, Autowired } from '../src';
import DbService from './DbService';

@Service
export default class TestService {
  @Autowired
  private dbServicedb: DbService;

  testService() {
    console.log('TestService class queryDb method', this);
    return 'ok';
  }
}
