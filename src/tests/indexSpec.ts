import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test for endpoints responses", (): void => {
  it("gets the /api/images?filename=fjord&width=200&height=200", async () => {
    const response = await request.get(
      "/api/images?filename=fjord&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it("404 for invalid endpoint", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(404);
  });
});
