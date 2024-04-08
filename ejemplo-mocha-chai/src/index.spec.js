// const { saludar } = require('./index.js')
// const assert = require('assert')
import { saludar } from './index.js'
import assert from 'assert'
import * as chai from 'chai'

const expect = chai.expect
const should = chai.should()

describe('Test index', () => {

  it('La función saludar devuelve Hola mundo', () => {
    const msg = saludar()
    // assert.ok(msg === 'Hola mundo')
    // expect(msg).to.be.equal('Hola mundo')
    msg.should.to.be.equal('Hola mundo')
  })

  it('Debería devolver Hola Ángel si llamamos a la función con el nombre Ángel', () => {
    const msg = saludar('Ángel')
    msg.should.be.equal('Hola Ángel')
  })

})