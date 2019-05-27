import { Bootstrap, Autowired } from '../';
import TestControl from './Controller';
import express = require('express');
import http = require('http');

@Bootstrap
class App {
  @Autowired
  testControl: TestControl;

  main() {
    const app = express();
    app.get('/index', this.testControl.index);
    app.get('/index2', this.testControl.index2);

    const server = http.createServer(app);

    server.listen(9001, function() {
      // const host = server.address().address;
      // const port = server.address().port;

      console.log('Example app listening at http://%s:%s');
    });
  }
}
