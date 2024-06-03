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

test('POST/ booking debe crear una reserva', async () => {
    const booking = {
        hotelId:1,
        checkIn:"2024-05-31",
        checkOut:"2024-06-10"
    }
    const response = await request(app).post('/bookings').send(booking).set("Authorization", `Bearer ${token}`)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.checkIn).toBe(booking.checkIn)
})



test('GET/ bookings debe traer todas las reservas', async () => {
    const response = await request(app).get('/bookings').set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('PUT/bookings/:id actualizar reserva', async () => {
    const booking = {
        hotelId:1,
        checkIn:"2024-06-20",
        checkOut:"2024-06-29"
    }
    const response = await request(app).put(`/bookings/${id}`).send(booking).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.checkOut).toBe(booking.checkOut)
})


test('DELETE/bookings/:id', async () => {
    const response = await request(app).delete(`/bookings/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(204)
})

