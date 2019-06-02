import { Controller, Autowired } from '../';
import { Request, Response, NextFunction } from 'express';
import TestService from './Service';
import DbService from './DbService';
import { Get } from '../core/MethodInject';
import { RequestParam, PathVariable } from '../core/ParameterDecorate';

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

  @Get('/index2/:id')
  index2(
    @PathVariable('id') id: string,
    @RequestParam('age') age: number,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('index method');
    this.dbService.queryDb();
    res.status(200).send(this.testService.queryDb());
  }

  test = () => {
    console.log('control test method');
  };
}
