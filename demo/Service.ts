import { Service } from '../src';

@Service
export default class TestService {
  queryDb() {
    console.log('TestService class queryDb method');
    return 'ok';
  }
}
