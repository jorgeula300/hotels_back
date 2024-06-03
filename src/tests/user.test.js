const app = require('../app')
const request = require('supertest')

let id;
let token;



test('POST/ users debe crear un usuario', async () => {
    const user = {
        firstName: "test user",
        lastName: "test user",
        email: "test@gmail.com",
        password: "test123456",
        gender: "other"
    }
    const response = await request(app).post('/users').send(user)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.firstName).toBe(user.firstName)
})

test('POST/users/login', async () => {
    const userCredentials = {
        email: "test@gmail.com",
        password: "test123456"
    }
    const response = await request(app).post('/users/login').send(userCredentials)
    token = response.body.token
    expect(response.status).toBe(201)
    expect(response.body.token).toBeDefined()
    expect(response.body.user.email).toBe(userCredentials.email)
})

test('GET/ users debe traer todos los usuarios', async () => {
    const response = await request(app).get('/users').set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('POST/users/login con credenciales incorrectas debe dar error', async () => {
    const userCredentials = {
        email: "testincorrecto@gmail.com",
        password: "test1234567"
    }
    const response = await request(app).post('/users/login').send(userCredentials)
    expect(response.status).toBe(401)
})

test('PUT/user/:id actualizar usuarios', async () => {
    const user = {
        firstName: "test user update",
        lastName: "test user update",
        email: "test@gmail.com",
        gender: "other"
    }
    const response = await request(app).put(`/users/${id}`).send(user).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.firstName).toBe(user.firstName)
})

test('DELETE/users/:id', async () => {
    const response = await request(app).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204)
})

