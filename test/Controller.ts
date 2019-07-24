import { Controller, Autowired } from '../src';
import { Request, Response, NextFunction } from 'express';
import TestService from './Service';
import DbService from './DbService';
import { Get, Multer, Post } from '../src/core/MethodInject';
import { RequestParam, PathVariable } from '../src/core/ParameterDecorate';
import 'multer';

@Controller('/api/test')
class TestControl {
  @Autowired
  testService: TestService;
  @Autowired
  dbService: DbService;

  @Get('/index')
  index(@RequestParam('age') age: number, req: Request, res: Response) {
    console.log('index method');
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

  @Post('/test-file')
  @Multer
  test(req: Request, res: Response) {
    console.log('control test method');
    const files = <Express.Multer.File[]>req.files;

    if (files && files.length > 0) {
      res.send(files[0].originalname);
    } else {
      res.status(400).json({ errorMsg: `The fields of file can't be null` });
    }
  }
}
