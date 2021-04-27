const request = require('supertest');
const app = require('../app');

describe('Testing user routes', () => {
    describe('POST /login success', () => {
        it('should return response with status code 200', (done) => {
          // setup
            const body = {
                email: 'admin@mail.com',
                password: '123456'
            }
          // execute
            request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('access_token');
                    expect(res.body).toHaveProperty('email', body.email);
                    expect(res.body).toHaveProperty('name');
                    expect(res.body).toHaveProperty('role');

                    done();
                }
            })
             
        })
    })

    describe('POST /login failed', () => {
        it('Email not found, should return response with status code 400', (done) => {
          // setup
            const body = {
                email: 'admin123@mail.com',
                password: '123456'
            }
          // execute
            request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    // assert
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('message', 'Email/password is invalid');

                    done();
                }
            })
             
        })

        it('Wrong password, should return response with status code 400', (done) => {
            // setup
              const body = {
                  email: 'admin@mail.com',
                  password: '123456789'
              }
            // execute
              request(app)
              .post('/login')
              .send(body)
              .end((err, res) => {
                  if (err) {
                      done(err);
                  } else {
                      // assert
                      expect(res.statusCode).toEqual(400);
                      expect(typeof res.body).toEqual('object');
                      expect(res.body).toHaveProperty('message', 'Email/password is invalid');
  
                      done();
                  }
              })
               
        })
        
        it('Empty email & password, should return response with status code 400', (done) => {
            // setup
              const body = {
                  email: '',
                  password: ''
              }
            // execute
              request(app)
              .post('/login')
              .send(body)
              .end((err, res) => {
                  if (err) {
                      done(err);
                  } else {
                      // assert
                      expect(res.statusCode).toEqual(400);
                      expect(typeof res.body).toEqual('object');
                      expect(res.body).toHaveProperty('message', 'Email is required');
  
                      done();
                  }
              })
               
        })
    })
})