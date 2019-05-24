import { Service } from '../core/ClassInject';

@Service()
export default class TestService {
  constructor() {
    console.log('constructor service');
  }
  query() {
    console.log('execuate query');
  }
}
