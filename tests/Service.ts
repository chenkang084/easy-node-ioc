import { Service, Autowired } from '../src';
import DuplicateTestService from './DuplicateTestService';

@Service
export default class TestService {
  @Autowired
  private duplicateTestService: DuplicateTestService;

  public testSay(): boolean {
    return false;
  }
}
