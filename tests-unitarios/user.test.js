const request = require('supertest');
const baseURL = "https://thinking-tester-contact-list.herokuapp.com";

describe("Pruebas API Thinking Tester", () => {
  let token = "";
  let uniqueEmail = `nicolas${Date.now()}@mail.com`;

  test("Registro de usuario", async () => {
    const res = await request(baseURL)
      .post("/users")
      .send({
        firstName: "Nicolas",
        lastName: "Lopez",
        email: uniqueEmail,
        password: "12345678"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toContain("@mail.com");
  });

  test("Login de usuario", async () => {
    const res = await request(baseURL)
      .post("/users/login")
      .send({
        email: uniqueEmail,
        password: "12345678"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});