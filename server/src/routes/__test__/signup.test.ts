import request from "supertest";
import { app } from "../../app";

interface TestObj {
  description: string;
  url: string;
  data: { email?: string; password?: string };
  response: number;
}
const testObj: TestObj[] = [
  {
    description: "returns a 201 on successful signup",
    url: "/api/users/signup",
    data: {
      email: "test@test.com",
      password: "password",
    },
    response: 201,
  },
  {
    description: "returns 400 with invalid email",
    url: "/api/users/signup",
    data: {
      email: "test",
      password: "password",
    },
    response: 400,
  },
  {
    description: "returns 400 with invalid password",
    url: "/api/users/signup",
    data: {
      email: "test@test.com",
      password: "pa",
    },
    response: 400,
  },
  {
    description: "returns 400 with missing email password",
    url: "/api/users/signup",
    data: {
      email: "",
      password: "",
    },
    response: 400,
  },
  {
    description: "returns 400 with invalid password",
    url: "/api/users/signup",
    data: {},
    response: 400,
  },
];

testObj.forEach((element) => {
  it(element.description, async () => {
    return request(app)
      .post(element.url)
      .send(element.data)
      .expect(element.response);
  });
});

it("Disallow Duplicate request", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  return await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});


it('sets a cookie after a successful signup' ,async ()=>{
    const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined()
})