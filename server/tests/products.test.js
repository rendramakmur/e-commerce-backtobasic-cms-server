const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const revertProduct = require('../helpers/delete-product-test')
let access_token_admin;
let access_token_customer;

describe('Testing product routes', () => {
    beforeAll(() => {
        access_token_admin = jwt.sign({id: 1, name: 'administrator', email: 'admin@mail.com', role: 'admin'}, process.env.JWT_SECRET);
        access_token_customer = jwt.sign({id: 1, name: 'customer', email: 'customer@mail.com', role: 'customer'}, process.env.JWT_SECRET);
    })
    afterAll(() => {
        revertProduct()
        .then(() => {
            done()
        })
        .catch(err => {
            done(err);
        })
    })
    
    describe('POST /products success', () => {
        it('should return response with status code 201', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('id');
                    expect(typeof res.body.id).toEqual('number');
                    expect(res.body).toHaveProperty('name', res.body.name);
                    expect(typeof res.body.name).toEqual('string');
                    expect(res.body).toHaveProperty('image_url', res.body.image_url);
                    expect(typeof res.body.image_url).toEqual('string');
                    expect(res.body).toHaveProperty('price', res.body.price);
                    expect(typeof res.body.price).toEqual('number');
                    expect(res.body.price).toBeGreaterThanOrEqual(0);
                    expect(res.body).toHaveProperty('stock', res.body.stock);
                    expect(typeof res.body.stock).toEqual('number');
                    expect(res.body.stock).toBeGreaterThanOrEqual(0);
                    expect(res.body).toHaveProperty('UserId', res.body.UserId);
                    expect(typeof res.body.UserId).toEqual('number');

                    done()
                }
            })

        })
    })
    
    describe('POST /products fail', () => {
        it('Without access_token, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('message');
                    expect(res.body.message).toEqual('Authentication error, please login');

                    done()
                }
            })
        })

        it('Unauthorized role access_token, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_customer)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('message');
                    expect(res.body.message).toEqual('You are not an admin');

                    done()
                }
            })
        })

        it('Empty field, should return response with status code 400', (done) => {
            let body = {
                name: '',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Product name is required'])
                    )

                    done()
                }
            })
        })

        it('Price is below 0 (minus), should return response with status code 400', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: -1,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Price must be greater than 0'])
                    )

                    done()
                }
            })
        })
        
        it('Stock is below 0 (minus), should return response with status code 400', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: -1,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock must be greater than 0'])
                    )

                    done()
                }
            })
        })

        it('Unmatch data types on field (ex: insert field stock with string), should return response with status code 400', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 'string',
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock must be in integer format'])
                    )

                    done()
                }
            })
        })

        it('Unmatch data types on field (ex: insert field image_url that not in URL format), should return response with status code 400', (done) => {
            let body = {
                name: 'Short pants',
                category: 'pants',
                image_url: 'not an url',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Image URL must be in URL format'])
                    );

                    done()
                }
            })
        })
    })

    describe('PUT /products/:id success', () => {
        it('should return response with status code 201', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('id');
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name', res.body.name);
                expect(typeof res.body.name).toEqual('string');
                expect(res.body).toHaveProperty('category', res.body.category);
                expect(typeof res.body.category).toEqual('string');
                expect(res.body).toHaveProperty('image_url', res.body.image_url);
                expect(typeof res.body.image_url).toEqual('string');
                expect(res.body).toHaveProperty('price', res.body.price);
                expect(typeof res.body.price).toEqual('number');
                expect(res.body).toHaveProperty('stock', res.body.stock);
                expect(typeof res.body.stock).toEqual('number');
                expect(res.body).toHaveProperty('UserId', res.body.UserId);
                expect(typeof res.body.UserId).toEqual('number');
    
                done()
            })
        })

        
    })

    describe('PUT /products/:id fail', () => {
        it('Without access_token, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Authentication error, please login');
    
                done()
            })
        })

        it('Unauthorized role access_token, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_customer)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('You are not an admin');
    
                done()
            })
        })

        it('Empty field errors, should return response with status code 403', (done) => {
            let body = {
                name: '',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 50,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Product name is required'])
                )
    
                done()
            })
        })

        it('Price below 0, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: -1,
                stock: 50,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Price must be greater than 0'])
                )
    
                done()
            })
        })

        it('Stock below 0, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: -1,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Stock must be greater than 0'])
                )
    
                done()
            })
        })

        it('Unmatch format (ex: field stock with string), should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'https://www.allbasicstore.com/wp-content/uploads/2018/12/cream.jpg',
                price: 120000,
                stock: 'string',
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Stock must be in integer format'])
                )
    
                done()
            })
        })

        it('image_URL must be in url format, should return response with status code 403', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'not url format',
                price: 120000,
                stock: 90,
                UserId: 1
            }

            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Image URL must be in URL format'])
                )
    
                done()
            })
        })

        it('Product id not found, should return response with status code 404', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'not url format',
                price: 120000,
                stock: 90,
                UserId: 1
            }

            request(app)
            .put('/products/100')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Product not found');
    
                done()
            })
        })
    })

    describe('DELETE /products/:id success', () => {
        it('should return response with status code 200', (done) => {
            request(app)
            .delete('/products/1')
            .set('access_token', access_token_admin)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Success. Product has been deleted')

                done()
            })
        })
    })

    describe('DELETE /products/:id fail', () => {
        it('Wihtout access_token, should return response with status code 403', (done) => {
            request(app)
            .delete('/products/1')
            .end((err, res) => {
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Authentication error, please login')

                done()
            })
        })

        it('Wihtout access_token, should return response with status code 403', (done) => {
            request(app)
            .delete('/products/1')
            .set('access_token', access_token_customer)
            .end((err, res) => {
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('You are not an admin')

                done()
            })
        })

        it('Product id not found, should return response with status code 404', (done) => {
            let body = {
                name: 'Short pants edited',
                category: 'pants',
                image_url: 'not url format',
                price: 120000,
                stock: 90,
                UserId: 1
            }

            request(app)
            .delete('/products/100')
            .set('access_token', access_token_admin)
            .send(body)
            .end((err, res) => {
                expect(res.statusCode).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Product not found');
    
                done()
            })
        })
    })

})