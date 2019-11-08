import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { Controller, Service, Autowired } from '../src';
import { serviceSet } from '../src';

describe('test easy-node-ioc', () => {
  before(() => {
    serviceSet.clear();
  });
  it('test singleton Service/Controller', () => {
    @Service
    class SingleTonService {}
    @Controller('/test')
    class TestControl {
      @Autowired
      private testService: SingleTonService;
      @Autowired
      private testService2: SingleTonService;
    }
    const { serviceSet } = require('../src/core/Bootstrap');
    expect(serviceSet.size).equal(1);
  });
});
