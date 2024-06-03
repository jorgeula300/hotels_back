const sequelize = require('../utils/connection');
const app = require('../app')
const request = require('supertest')
const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: "test user",
            lastName: "test user",
            email: "test2@gmail.com",
            password: "test123456",
            gender: "other"
        }
        await request(app).post('/users').send(user)
        
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();