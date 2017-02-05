import Response from '../../lib/conektaCard/response'
import {expect} from 'chai'

describe('Response', () => {
  it('returns null errors if none sent', () => {
    let res = new Response()

    expect(res.errors).to.equal(null)
  })

  it('default error when no Joi obj error', () => {
    let res = new Response({errors: {}})

    expect(res.errors).to.deep.equal({
      name: 'ProviderError',
      message: 'Hubo un error procesando la tarjeta'
    })
  })

  it('builds loopbackify errors when Joi obj', () => {
    const err = {
      isJoi: true,
      details: [{path: 'email', message: 'invalid email'}]
    }
    const expected = {
      name: 'ValidationError',
      message: 'Hubo errores de validación',
      details: {
        context: 'ConektaCard',
        messages: [{email: ['invalid email']}]
      }
    }
    let res = new Response({errors: err})

    expect(res.errors).to.deep.equal(expected)
  })
})
