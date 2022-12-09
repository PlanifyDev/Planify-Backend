import supertest from "supertest";
import app from "../server";

describe("Integration test", () => {
  const client = supertest(app);
  const email = "mosta148999@gmail.com";
  const firstname = "mostafa";
  const lastname = "ahmed";
  const password = "12345678";
  let user_id: string, jwt: string;

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
    jwt = result.body.jwt;
  });

  it("fails signup without required fields", async () => {
    await client
      .post("/signup")
      .send({
        firstname,
        lastname,
      })
      .expect(400);
  });

  it("fails signup with invalid data", async () => {
    await client
      .post("/signup")
      .send({
        firstname,
        lastname,
        email: "mosatfa",
        password: "123",
      })
      .expect(400);
  });

  it("verify email", async () => {
    const result = await client.get(`/verify/?key=${jwt}`); //.expect(200);
  });

  it("can sign in with email", async () => {
    const result = await client
      .post("/signin")
      .send({ email, password })
      .expect(200);
    expect(result.body.jwt).toBeDefined();

    jwt = result.body.jwt;
    user_id = result.body.user.id;
  });

  it("sign in with wrong data", async () => {
    const result = await client
      .post("/signin")
      .send({ email, password: "115649848964654" })
      .expect(403);
  });

  it(" update user data with old password", async () => {
    const newData = {
      firstname: "new name1",
      lastname: "new name2",
      password: "87654321",
      oldPassword: "12345678",
    };
    const result = client
      .put(`/updateall/${user_id}`)
      .set("authorization", jwt)
      .send(newData)
      .expect(200);
  });

  it(" update user data with wrong password", async () => {
    const newData = {
      firstname: "new name1",
      lastname: "new name2",
      password: "87654321",
      oldPassword: "wrongPassword",
    };
    const result = client
      .put(`/updateall/${user_id}`)
      .set("authorization", jwt)
      .send(newData)
      .expect(400);
  });

  it(" delete user after all these operation ", async () => {
    const result = await client
      .delete(`/deleteuser/${user_id}`)
      .set("authorization", jwt)
      .expect(200);
  });
});
