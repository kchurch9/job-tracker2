import {expect} from 'chai'
import {getApplicationWithNextStatus} from '../util.js'

describe('applications/util', function() {
  describe('getApplicationWithNextStatus()', function() {
    
    it('returns application with applied status when status is interested', function() {
      const previousApp = {
        status: 'Interested',
        name: 'hello'
      }
      const expectedApp = {
        status: 'Applied',
        name: 'hello'
      }
      const actualApp = getApplicationWithNextStatus(previousApp)

      expect(actualApp).to.eql(expectedApp)
    })

    it('returns application with phone interview status when status is applied', function() {
      const previousApp = {
        status: 'Applied',
        name: 'hello'
      }
      const expectedApp = {
        status: 'Phone Interview',
        name: 'hello'
      }
      const actualApp = getApplicationWithNextStatus(previousApp)

      expect(actualApp).to.eql(expectedApp)
    })

    it('returns application with interview status when status is phone interview', function() {
      const previousApp = {
        status: 'Phone Interview',
        name: 'hello'
      }
      const expectedApp = {
        status: 'Interview',
        name: 'hello'
      }
      const actualApp = getApplicationWithNextStatus(previousApp)

      expect(actualApp).to.eql(expectedApp)
    })
    
    it('returns application with results status when status is interview', function() {
      const previousApp = {
        status: 'Interview',
        name: 'hello'
      }
      const expectedApp = {
        status: 'Results',
        name: 'hello'
      }
      const actualApp = getApplicationWithNextStatus(previousApp)

      expect(actualApp).to.eql(expectedApp)
    })
  })

  describe('getApplicationWithPreviousStatus()', function() {
    it('returns application with interview status when status is results', function() {
      //todo 
    })
  })
})

