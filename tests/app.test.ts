const request = require('supertest')
import app from '../app'

describe('app router test', () => {
  test('200 root page', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
  test('200 about page', () => {
    return request(app)
      .get('/about')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
  test('301 create-article page', () => {
    return request(app)
      .get('/article/create-article')
      .then((response) => {
        expect(response.statusCode).toBe(302)
      })
  })
  test('200 login page', () => {
    return request(app)
      .get('/auth/login')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
})
