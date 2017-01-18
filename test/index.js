import ConektaCard from '../lib/conektaCard';
import NextPayments from '../lib';
import {expect} from 'chai';

describe('NextPayments', () => {
  it('implements process fn', () => {
    expect(NextPayments).to.respondTo('process');
  });

  it('throws an exception when the processor type is invalid', () => {
    const fn = () => {
      return new NextPayments('');
    };

    expect(fn).to.throw(Error);
  });

  it('returns conekta processor class', () => {
    let sub = new NextPayments('ConektaCard');

    expect(sub.processor).to.be.an.instanceof(ConektaCard);
  });
});
