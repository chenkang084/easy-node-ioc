import { Bootstrap, ComponentScan } from '../src';
import { join } from 'path';
import express = require('express');
import http = require('http');

@ComponentScan(join(__dirname, './Controller.js'))
@Bootstrap
class App {
  constructor() {}

  app = express();

  main() {
    const server = http.createServer(this.app);

    server.listen(9001, function() {
      console.log('Example app has started.');
    });
  }
}
