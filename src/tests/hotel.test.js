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
    // console.log(response.status)
    // expect(response.status).toBe(201)
    // expect(response.body.token).toBeDefined()
    // expect(response.body.user.email).toBe(userCredentials.email)
})


test('POST/ hotels debe crear un Hotel', async () => {
    const Hotel = {
        name: "Hotel test",
        description: "test descrip.",
        price: 200.000,
        address: "Carrera test N test B",
        lat: 5.69188,
        lng: -76.65835,
        cityId: 1
    }
    const response = await request(app).post('/hotels').send(Hotel).set("Authorization", `Bearer ${token}`)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(Hotel.name)
})



test('GET/ hotels debe traer todos los hoteles', async () => {
    const response = await request(app).get('/hotels').set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('PUT/ hotels/:id actualizar hotel', async () => {
    const Hotel = {
        name: "Hotel test",
        description: "test descrip.",
        price: 200.000,
        address: "Carrera test N test B",
        lat: 5.69188,
        lng: -76.65835,
        cityId: 1
    }
    const response = await request(app).put(`/hotels/${id}`).send(Hotel).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(Hotel.name)
})

test('DELETE/hotels/:id', async () => {
    const response = await request(app).delete(`/hotels/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204)
})

