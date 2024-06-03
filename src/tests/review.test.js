const app = require('../app')
const request = require('supertest')

let id;
let token;

beforeAll(async () => {
    const userCredentials = {
        email: "test2@gmail.com",
        password: "test123456"
    }
    const response = await request(app).post('/users/login').send(userCredentials)
    token = response.body.token
})

test('POST/ review debe crear un comentario', async () => {
    const review = {
        comment:"Text the test", 
        rating:5,
        hotelId:1
    }
    const response = await request(app).post('/reviews').send(review).set("Authorization", `Bearer ${token}`)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.comment).toBe(review.comment)
})



test('GET/ review debe traer todos los comentarios', async () => {
    const response = await request(app).get('/reviews').set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('PUT/reviews/:id actualizar comentario', async () => {
    const review = {
        comment:"Text the test update", 
        rating:4,
        hotelId:1
    }
    const response = await request(app).put(`/reviews/${id}`).send(review).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.comment).toBe(review.comment)
})

test('DELETE/reviews/:id', async () => {
    const response = await request(app).delete(`/reviews/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204)
})