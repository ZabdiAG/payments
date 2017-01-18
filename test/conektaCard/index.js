import assert from 'assert';
import ConektaCard from '../../lib/ConektaCard';

describe('#process', () => {
  it('throws response object', () => {
    let conektaCard = new ConektaCard();

    conektaCard.process(res => {
      assert(res.constructor.name, 'Response');
    });
  });
});
