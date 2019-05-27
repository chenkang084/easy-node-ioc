import { Controller, Autowired } from '../';
import { Request, Response, NextFunction } from 'express';
import TestService from './Service';
import DbService from './DbService';
@Controller('')
export default class TestControl {
  constructor() {
    this.index.bind(this);
  }
  @Autowired
  testService: TestService;
  @Autowired
  dbService: DbService;

  index = (req: Request, res: Response, next: NextFunction) => {
    console.log('index method');
    this.dbService.queryDb();
    res.status(200).send(this.testService.queryDb());
  };

  index2(req: Request, res: Response, next: NextFunction) {
    console.log('index method');
    this.dbService.queryDb();
    res.status(200).send(this.testService.queryDb());
  }

  test() {
    console.log('control test method');
  }
}
