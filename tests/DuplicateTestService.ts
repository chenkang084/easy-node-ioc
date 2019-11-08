import { Service, Autowired } from '../src';
import TestService from './Service';

@Service
export default class DuplicateTestService {
  @Autowired
  private testService: TestService;

  public duplicateSay(): boolean {
    return false;
  }
}
