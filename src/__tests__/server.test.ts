import request from "supertest";
import server from "../server";

describe("GET /api", () => {
  it("Should return a json response with status 200", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde api");
  });
});
