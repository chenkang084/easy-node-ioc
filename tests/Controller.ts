import { Controller, Autowired, Get, RequestParam } from '../src';
import TestService from './Service';
import { Request, Response, NextFunction } from 'express';

@Controller('/api/test')
export default class TestControl {
  @Autowired
  private service: TestService;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  @Get('/index')
  index(@RequestParam('age') age: number, req: Request, res: Response) {
    console.log('index method');
    // this.dbService.queryDb();

    res.status(200).send('ok');
  }
}
