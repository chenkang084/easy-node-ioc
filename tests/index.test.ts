import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Bootstrap, Controller, Service, Autowired } from '../src';
import express = require('express');
import http = require('http');

describe('test easy-node-ioc', () => {
  it('test Bootstrap method', () => {
    @Bootstrap
    class App {
      constructor() {
        console.log('App constructor method');
      }

      app = express();

      main() {
        const server = http.createServer(this.app);

        server.listen(9001, function() {
          console.log('Example app has started.');

          server.close();
        });
      }
    }
  });

  it('test inject Controller', () => {
    @Controller('/test')
    class TestControl {}

    const { controlSet } = require('../src/core/Bootstrap');

    expect(controlSet.has(TestControl)).equal(true);
  });

  // it('test inject Service', () => {
  //   @Service()
  //   class TestService {}

  //   const { controlSet } = require('../src/core/Bootstrap');

  //   expect(controlSet.has(TestService)).equal(true);
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
