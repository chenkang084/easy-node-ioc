# easy-node-ioc

Use Typescript's decorator implement auto injection just like Spring MVC, the web framework is [Express](https://expressjs.com/).

[![Version npm](https://img.shields.io/npm/v/winston.svg?style=flat-square)](https://www.npmjs.com/package/winston)[![npm Downloads](https://img.shields.io/npm/dm/winston.svg?style=flat-square)](https://npmcharts.com/compare/winston?minimal=true)

## Installation

```js
npm i easy-node-ioc --save-dev
```

## Quick Start

```sh
git clone https://github.com/chenkang084/easy-node-ioc.git
npm i
 NODE_ENV=development npx ts-node demo/App.ts
```

When you execuate above commands , the `Example app has started` will display in your termial , then means web application started and worked well, if you try to input http://localhost:9001/api/test/index in your browser , you will see OK in your browser.

## Usage

### 1.Create a Controller

```javascript
import { Controller} from 'easy-node-ioc';
@Controller('/test')
class TestControl {
    ...
}
```

### 2.Create a Service

```javascript
import { Service } from 'easy-node-ioc';
@Service('')
class TestService {
    ...
}
```

### 3.Inject Service

```javascript
import { Autowired,Controller } from 'easy-node-ioc';
@Controller('/test')
class TestControl {
    @Autowired
    testService: TestService;
    ...
}
```

### 4.Define Rest API in Controller , Such as GET,POST,PUT,DELETE,PATCH

```javascript
import { Autowired,Controller,GET,RequestParam } from 'easy-node-ioc';
@Controller('/test')
class TestControl {
    @Autowired
    testService: TestService;
    @Get('/index')
    index(@RequestParam('age') age: number, req: Request, res: Response) {
        console.log('index method');
        this.dbService.queryDb();

        res.status(200).send(this.testService.queryDb());
    }
    ...
}
```

### 5.Define Start App and use express start web application

```javascript
import { Bootstrap, ComponentScan } from '../';
@ComponentScan(join(__dirname, './Controller.ts'))
@Bootstrap
class App {
  constructor() {}

  app = express();

  main() {
    const server = http.createServer(this.app);

    server.listen(9001, function() {
      console.log('Example app listening at http://%s:%s');
    });
  }
}
```

## How to debug

if you use vscode , just follow `.vscode/launch.json` , select `Launch Test Case` .  
if you see `Example app has started.` in the console , then means test case start successfully .  
Try to call `http://localhost:9001/api/test/index` .

## TODO List

add create-easy-node-ioc project client
support swagger-ui
