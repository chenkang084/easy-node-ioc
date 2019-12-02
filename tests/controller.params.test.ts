import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');
import { Request, Response, NextFunction } from 'express';
import { Controller, RequestParam, Post, Bootstrap, RequestBody, Body, Get, PathVariable } from '../src';
const axios = require('axios');

describe('test paramters of Controller in easy-node-ioc', () => {
  before(() => {
    @Controller('/test')
    class TestControl {
      @Post('/test-requestBody')
      testRequestBody(@RequestBody('user') user: any, req: Request, res: Response) {
        res.send(user);
      }

      @Get('/test-RequestParam')
      testRequestParam(@RequestParam('age') age: string, req: Request, res: Response) {
        res.send(age);
      }

      @Post('/test-PathVariable/:uuid')
      testPathVariable(@PathVariable('uuid') uuid: string, req: Request, res: Response) {
        res.send(uuid);
      }

      @Post('/test-Body')
      testBody(@Body('name') name: any, req: Request, res: Response) {
        res.send(name);
      }
    }

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

        server.listen(9002, function() {
          console.log('Example app has started.');
        });
      }
    }
  });
  it('test requestBody of Controller', async () => {
    const { data } = await axios.post('http://localhost:9002/test/test-requestBody', {
      name: 'jack'
    });

    expect(JSON.stringify(data)).equals(JSON.stringify({ name: 'jack' }));
  });

  it('test Body of Controller', async () => {
    const { data } = await axios.post('http://localhost:9002/test/test-Body', {
      name: 'jack'
    });

    expect(data).equals('jack');
  });

  it('test RequestParam of Controller', async () => {
    const { data } = await axios.get('http://localhost:9002/test/test-RequestParam?age=18');

    expect(data).equals(18);
  });

  it('test PathVariable of Controller', async () => {
    const { data } = await axios.post('http://localhost:9002/test/test-PathVariable/uuid123');

    expect(data).equals('uuid123');
  });
});
