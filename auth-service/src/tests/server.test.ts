import supertest from "supertest";
import app from "../server";

// const request = supertest(app);

// describe("test status of server", () => {
//   it("check the test endpoint is running", async () => {
//     const response = await request.get(`/test`);
//     expect(response.status).toBe(200);
//   });
// });

describe("Integration test", () => {
  const client = supertest(app);
  const email = "mosta148999@mail.com";
  const firstname = "mostafa";
  const lastname = "ahmed";
  const password = "12345678";
  let user_id, jwt;

  it("Server is running", async () => {
    client.get("/test").expect(200);
  });

  it("Signs up a new user", async () => {
    const result = await client
      .post("/signup")
      .send({
        firstname,
        lastname,
        email,
        password,
      })
      .expect(200);
    expect(result.body.jwt).toBeDefined();
  });

  it("fails signup without required fields", async () => {
    await client
      .post("signup")
      .send({
        firstname,
        lastname,
      })
      .expect(400);
  });

  it("fails signup with invalid data", async () => {
    await client
      .post("signup")
      .send({
        firstname,
        lastname,
        email: "mosatfa",
        password: "123",
      })
      .expect(400);
  });

  it("can login with email", async () => {
    const result = await client
      .post("/login")
      .send({ email, password })
      .expect(200);
    expect(result.body.jwt).toBeDefined();
  });

  it("login with wrong data", async () => {
    const result = await client
      .post("/login")
      .send({ email, password: 115649848964654 })
      .expect(400);
  });
});
