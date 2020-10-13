# easy-node-ioc

用 Typescript 的装饰器实现依赖注入，就像我们使用 Spring MVC 框架一样，web 框架使用的是 [Express](https://expressjs.com/)。

[![Version npm](https://img.shields.io/npm/v/winston.svg?style=flat-square)](https://www.npmjs.com/package/winston)[![npm Downloads](https://img.shields.io/npm/dm/winston.svg?style=flat-square)](https://npmcharts.com/compare/winston?minimal=true)

## 安装

```js
npm i easy-node-ioc --save-dev
```

## 快速开始使用

```sh
git clone https://github.com/chenkang084/easy-node-ioc.git
npm i
NODE_ENV=development npx ts-node demo/App.ts
```

执行完以上命令，将在命令行输出 `Example app has started`,代码项目已正常经启动起来了，尝试访问 http://localhost:9001/api/test/index ,页面将返回 OK。

## 使用

### 1.创建 Controller

```javascript
import { Controller} from 'easy-node-ioc';
@Controller('/test')
class TestControl {
    ...
}
```

### 2.创建 Service

```javascript
import { Service } from 'easy-node-ioc';
@Service('')
class TestService {
    ...
}
```

### 3.将 Service 注入到 Controller 中

```javascript
import { Autowired,Controller } from 'easy-node-ioc';
@Controller('/test')
class TestControl {
    @Autowired
    testService: TestService;
    ...
}
```

### 4.在 Controller 中定义 Rest API，例如 GET,POST,PUT,DELETE,PATCH

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

### 5.定义 App，添加 ComponentScan，添加 Bootstrap 注解到 App 类

```javascript
import { Bootstrap, ComponentScan } from '../';
@ComponentScan(join(__dirname, './Controller.ts'))
@Bootstrap
class App {
  constructor() {}

  app = express();

  main() {
    const server = http.createServer(this.app);

    server.listen(9001, function () {
      console.log('Example app listening at http://%s:%s');
    });
  }
}
```

第 5 步是非常关键的，ComponentScan 注解负责告诉`easy-node-ioc`去指定目录读取 js/ts 文件，在读取文件的过程中，根据 Decorator 定义，向容器中添加对应实例，在 Boostrap 方法里面根据文件依赖，去容器中获取已经实例化的对象（如果对象没有实例化，就立即实例化），等所有的依赖都注入完成，执行`main`方法。

## 测试

`npm test`
本项目已经写了一些基础的 test case，可以在项目路径下的 tests 目录查看。

## Debug

在`.vscode`目录的 launch.json 文件中，已经配置好了 debug 相关的代码，你可以直接在`vscode`中使用 F5 进行 debug，这样更方便你了解项目是如何实现的。

## 其他

如果你对`decorator`比较感兴趣，可以查看相关资料，了解 decorator 如何使用。

我建立了一个微信群，如果你对这个小工具感兴趣，可以加群，或者如果你有什么问题，也可以进群交流。

<p align="left">
  <a href="https://github.com/chenkang084/easy-node-ioc">
    <img width="200" src="https://raw.githubusercontent.com/chenkang084/easy-node-ioc/master/assets/RQCode.jpeg">
  </a>
</p>

## TODO

用 uuid 作为 key，重新定义 iocContainer ,重新组织 key --> instance
