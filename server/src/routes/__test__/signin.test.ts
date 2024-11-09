import request  from "supertest";
import { app } from "../../app";

it('responds with a cookie when given valid credentials' ,async ()=>{
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);
    const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined()
})

it("It fails when incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(201);
    return await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "1password" })
      .expect(400);
  });
