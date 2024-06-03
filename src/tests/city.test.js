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


test('POST/ cities debe crear un ciudad', async () => {
    const city = {
        name: "test city",
        country: "test country",
        countryId: "tI"
    }
    const response = await request(app).post('/cities').send(city).set("Authorization", `Bearer ${token}`)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(city.name)
})



test('GET/ cities debe traer todos los usuarios', async () => {
    const response = await request(app).get('/cities').set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})


test('PUT/ cities/:id actualizar ciudades', async () => {
    const city = {
        name: "test city update",
        country: "test country update",
        countryId: "tI"
    }
    const response = await request(app).put(`/cities/${id}`).send(city).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(city.name)
})

test('DELETE/cities/:id', async () => {
    const response = await request(app).delete(`/cities/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204)
})

