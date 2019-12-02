import { Bootstrap, ComponentScan, preHandles } from '../src';
import { join } from 'path';
import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');

function conncetDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('connected to db');
    }, 4000);
  });
}

preHandles.push(conncetDb());

@ComponentScan(join(__dirname, './Controller.ts'))
@Bootstrap
class App {
  constructor() {
    console.log('App constructor method');

    this.app.use(
      bodyParser.json({
        limit: 1024
      })
    );

    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  app = express();

  main() {
    const server = http.createServer(this.app);

    server.listen(9001, function() {
      console.log('Example app has started.');
    });
  }
}
