import { Controller, Autowired } from '../';
import { Request, Response, NextFunction } from 'express';
import TestService from './Service';
import DbService from './DbService';
import { Get } from '../core/MethodInject';
import { RequestParam } from '../core/ParametrDecorate';

@Controller('/test')
export default class TestControl {
  constructor() {
    this.index.bind(this);
  }
  @Autowired
  testService: TestService;
  @Autowired
  dbService: DbService;

  @Get('/index')
  index(@RequestParam('age') age: number, req: Request, res: Response) {
    console.log('index method');
    // console.log(req);
    this.dbService.queryDb();

    res.status(200).send(this.testService.queryDb());
  }

  @Get('/index2')
  index2(req: Request, res: Response, next: NextFunction) {
    console.log('index method');
    this.dbService.queryDb();
    res.status(200).send(this.testService.queryDb());
  }

  test = () => {
    console.log('control test method');
  };
}

// function test() {
//   const name = 1;
//   function test2() {
//     console.log(name);
//   }
// }
