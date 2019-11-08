import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { Controller, Service, Autowired } from '../src';
import { serviceSet } from '../src';
serviceSet.clear();
import TestService from './Service';

describe('test easy-node-ioc', () => {
  it('test dupliate import', () => {
    @Controller('/test')
    class TestControl {
      @Autowired
      private testService: TestService;
    }

    expect(serviceSet.size).equal(2);
  });
});
