import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async ()=>{
    await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

    const response = await request(app)
    .get('/api/users/signout')
    .expect(200);

    expect(response.get('Set-Cookie')?.[0]).toBeDefined()
})