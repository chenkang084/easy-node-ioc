import { Service } from '../src';

@Service()
export default class TestService {
  queryDb() {
    console.log('DbService class queryDb method');
    return 'ok';
  }
}
