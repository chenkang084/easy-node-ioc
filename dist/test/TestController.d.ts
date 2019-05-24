import TestService from './TestService';
export default class TestControl {
    testService: TestService;
    constructor(test: string);
    indexPage(test: string): void;
}
