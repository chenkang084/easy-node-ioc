import { Service } from '../';

@Service()
export default class DbService {
  queryDb() {
    console.log('DbService class queryDb method');
    return 'ok';
  }
}
