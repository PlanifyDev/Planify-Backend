import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("test status of server", () => {
  it("check the test endpoint is running", async () => {
    const response = await request.get(`/test`);
    expect(response.status).toBe(200);
  });
});
