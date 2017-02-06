import ConektaCard from './conektaCard'
import ComproPago from './compropago'

export default class NextPayments {
  constructor (processorType, params = {}) {
    this.params = params
    this.processor = this._initProcessor(processorType, params)
  }

  process () {
    return this.processor.process()
  }

  _initProcessor (type, params) {
    let processor

    switch (type) {
      case 'ConektaCard':
        processor = new ConektaCard(params)
        break
      case 'ComproPago':
        processor = new ComproPago(params)
        break
      default:
        throw new Error('InvalidProcessorType')
    }

    return processor
  }
}
