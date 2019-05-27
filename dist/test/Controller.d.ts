import { Request, Response, NextFunction } from 'express';
import TestService from './Service';
import DbService from './DbService';
export default class TestControl {
    constructor();
    testService: TestService;
    dbService: DbService;
    index: (req: Request, res: Response, next: NextFunction) => void;
    index2(req: Request, res: Response, next: NextFunction): void;
    test(): void;
}
