import { Bootstrap, ComponentScan } from '../';
import TestControl from './Controller';
import express = require('express');
import http = require('http');

@ComponentScan('./Controller.js')
@Bootstrap
class App {
  constructor() {
    require('./Controller');
  }

  app = express();

  main() {
    const server = http.createServer(this.app);

    server.listen(9001, function() {
      console.log('Example app listening at http://%s:%s');
    });
  }
}
