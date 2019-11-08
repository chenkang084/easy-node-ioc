import { Service, Autowired } from '../src';
import DuplicateTestService from './DuplicateTestService';

@Service
export default class TestService {
  @Autowired
  private duplicateTestService: DuplicateTestService;

  constructor() {
    console.log();
  }

  public testSay(): boolean {
    return false;
  }
}
