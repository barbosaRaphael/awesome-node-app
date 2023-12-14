const request = require('supertest')
import app from '../app'

describe('app router test', () => {
  test('200 response on root page', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
  test('200 response on about page', () => {
    return request(app)
      .get('/about')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
})
