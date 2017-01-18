import ConektaCard from './conektaCard';

export default class NextPayments {
  constructor(processorType, params = {}) {
    this.params = params;
    this.processor = this._initProcessor(processorType, params);
  }

  process(cb) {
    this.processor.process(res => {
      cb(res);
    });
  }

  _initProcessor(type, params) {
    let processor;

    switch (type) {
      case 'ConektaCard':
        processor = new ConektaCard(params);
        break;
      default:
        throw new Error('InvalidProcessorType');
    }

    return processor;
  }
}
