import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { join } from 'path';
import {
  Bootstrap,
  Controller,
  ComponentScan,
  Service,
  Autowired
} from '../src';
import express = require('express');
import http = require('http');

describe('test easy-node-ioc', () => {
  before(() => {
    // const service = require('./Service');
    // const controller = require('./Controller');
  });

  it('test Bootstrap method', () => {
    @Bootstrap
    @ComponentScan(join(__dirname, './Controller.ts'))
    class App {
      // @Autowired
      // private testService: TestService;
      app = express();
      main() {
        const server = http.createServer(this.app);
        server.listen(9001, function() {
          console.log('Example app has started.');
          // server.close();
        });
      }
    }
  });
  // it('test inject Controller', () => {
  //   @Controller('/test')
  //   class TestControl {}
  //   const { controlSet } = require('../src/core/Bootstrap');
  //   expect(controlSet.has(TestControl)).equal(true);
  // });
  // it('test inject Service', () => {
  //   // @Service
  //   class TestService {}
  //   @Bootstrap
  //   class App {
  //     @Autowired
  //     private testService: TestService;
  //     @Autowired
  //     private testService2: TestService;
  //   }
  // });
  // const { controlSet } = require('../src/core/Bootstrap');
  // expect(controlSet.has(TestService)).equal(true);
  // });
  // it('test Autowired', async () => {
  //   @Service()
  //   class TestService {}
  //   @Controller('/test')
  //   class TestControl {
  //     @Autowired
  //     private testService: TestService;
  //   }
  //   const { controlSet } = require('../src/core/Bootstrap');
  //   expect(controlSet.has(TestControl)).equal(true);
  // });
});
